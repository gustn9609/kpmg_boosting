import torch
import torch.nn.functional as F
from typing import Union, Optional
from nltk.translate.bleu_score import sentence_bleu, SmoothingFunction


### Additional Loss ###
def cal_reward_loss(
    device: str,
    sample_probs: torch.Tensor,
    reward: torch.Tensor,
    end_idxs: Optional[torch.Tensor] = None
):
    """Calculate a loss using the reward value
    Args:
        device (str)
        sample_probs (torch.Tensor): _description_
        reward (torch.Tensor): Tensor of reward values
        end_idxs (Optional[torch.Tensor], optional): Tensor of end indices of sentences. Defaults to None.
    Returns:
        _type_: _description_
    """
    sample_probs = sample_probs.contiguous()
    sample_logprobs = torch.log(sample_probs)
    reward = reward.unsqueeze(1).contiguous()
    if end_idxs is not None:
        batch_size, max_len = sample_probs.size()
        mask = torch.zeros(batch_size, max_len).to(device)
        for i, l in enumerate(end_idxs):
            mask[i, :l] = 1
        mask = mask.float().contiguous()
        output = -sample_logprobs * reward * mask
        output = (output.sum(-1)/mask.sum(-1)).mean()
    else:
        output = -sample_logprobs * reward
        output = output.mean()

    return output


def cal_sc_loss(device, logits, end_idx, classifier, tokenizer, sc_tokenizer, style):
    """Calculate the loss of style classifier-based reward
    Args:
        config (_type_)
        device (str)
        logits (_type_): The model output logits
        end_idx (_type_): The index of the end of a sentence except padding
        classifier (_type_): Trained style classifier model
        tokenizer (_type_)
        sc_tokenizer (_type_)
        style (_type_): The target style label (0: not offensive, 1: offensive)
    Returns:
        float: Style classification loss
    """
    probs = F.softmax(logits, dim=-1)
    sample_probs, sample_idx = sample_3d(device, probs)

    tgt = []
    for i, s in zip(end_idx.cpu(), sample_idx):
        e = torch.arange(len(s))[s.eq(tokenizer.eos_token_id)]
        e = e[0] if 0<len(e) and 4<e[0]<i else i-1
        tgt.append(s[:e].cpu().tolist())
    tgt_idx = sc_tokenizer(
        tokenizer.batch_decode(tgt),
        max_length=128,
        padding="max_length",
        truncation=True,
        return_tensors="pt",
    ).to(device)
    with torch.no_grad():
        tgt_cls = classifier(**tgt_idx).logits

    if style == 0:
        tgt_reward = torch.ones(tgt_cls.size()).to(device) - tgt_cls * 2
    else:
        tgt_reward = tgt_cls * 2 - torch.ones(tgt_cls.size()).to(device)

    loss_sc = cal_reward_loss(device, sample_probs, tgt_reward, end_idx)

    return loss_sc


def cal_bl_reward(device, inp, tgt):
    smooth = SmoothingFunction()
    bleus = []
    for hyp, ref in zip(inp, tgt):
        bleus.append(sentence_bleu([ref], hyp,
                                smoothing_function=smooth.method1))
    bleus = torch.FloatTensor(bleus).to(device)

    return bleus


def cal_bl_loss(device, logits, tgt, end_idx, tokenizer):
    probs = F.softmax(logits, dim=-1)
    sample_probs, sample_idx = sample_3d(device, probs)
    greedy_probs, greedy_idx = torch.max(probs, dim=-1)

    tgt_sam, tgt_gre, tgt_ref = [], [], []
    for i, s, g, t in zip(end_idx.cpu(), sample_idx, greedy_idx, tgt):
        s_e = torch.arange(len(s))[s.eq(tokenizer.eos_token_id)]
        s_e = s_e[0] if 0<len(s_e) and 0<s_e[0]<i else i-1
        g_e = torch.arange(len(g))[g.eq(tokenizer.eos_token_id)]
        g_e = g_e[0] if 0<len(g_e) and 0<g_e[0]<i else i-1

        tgt_sam.append(s[:s_e].cpu().tolist())
        tgt_gre.append(g[:g_e].cpu().tolist())
        tgt_ref.append(t[1:i].cpu().tolist())

    tgt_sam = cal_bl_reward(device, tgt_sam, tgt_ref)
    tgt_gre = cal_bl_reward(device, tgt_gre, tgt_ref)
    loss_co = cal_reward_loss(device, sample_probs, (tgt_gre-tgt_sam)*0.2, end_idx)
    # loss_co = cal_reward_loss(device, sample_probs, tgt_gre, end_idx)

    return loss_co


def sample_3d(
    device: str,
    probs: torch.Tensor,
    temperature: float = 1
):
    sample_idx = torch.zeros(probs.size(0), probs.size(1)).to(device)
    sample_probs = torch.zeros(probs.size(0), probs.size(1)).to(device)
    if temperature != 1:
        temp = torch.exp(torch.div(torch.log(probs + 1e-20), temperature))
    else:
        temp = probs
    for i, s in enumerate(temp):
        temp_idx = torch.multinomial(s, 1)  # Shape: (seq_len, 1)
        temp_probs = s.gather(1, temp_idx)  # Shape: (seq_len, 1)
        sample_idx[i] = temp_idx.squeeze(1)
        sample_probs[i] = temp_probs.squeeze(1)

    return sample_probs, sample_idx.long()

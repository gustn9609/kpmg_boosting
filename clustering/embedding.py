import torch
from tqdm import tqdm
from torch.utils.data import (DataLoader, TensorDataset, SequentialSampler)
from transformers import AutoTokenizer
from models import BertEncoder
import numpy as np
import random
def train(corpus):
    torch.manual_seed(42)
    torch.cuda.manual_seed(42)
    np.random.seed(42)
    random.seed(42)
    model_checkpoint = "klue/bert-base"
    tokenizer = AutoTokenizer.from_pretrained(model_checkpoint)
    p_encoder = BertEncoder.from_pretrained(model_checkpoint)
    eval_batch_size = 8
    p_encoder.cuda()

    valid_p_seqs = tokenizer(corpus, padding="max_length", truncation=True, return_tensors='pt')
    valid_dataset = TensorDataset(valid_p_seqs['input_ids'], valid_p_seqs['attention_mask'], valid_p_seqs['token_type_ids'])
    valid_sampler = SequentialSampler(valid_dataset)
    valid_dataloader = DataLoader(valid_dataset, sampler=valid_sampler, batch_size=eval_batch_size)

    p_embs = []

    with torch.no_grad():

        epoch_iterator = tqdm(valid_dataloader, desc="Iteration", position=0, leave=True)
        p_encoder.eval()

        for _, batch in enumerate(epoch_iterator):
            batch = tuple(t.cuda() for t in batch)

            p_inputs = {'input_ids': batch[0],
                        'attention_mask': batch[1],
                        'token_type_ids': batch[2]
                        }
                
            outputs = p_encoder(**p_inputs).to('cpu').numpy()
            p_embs.extend(outputs)

    p_embs = np.array(p_embs)
    print(p_embs.shape)  # (num_passage, emb_dim)
    print(p_embs[:,1].shape)
    print(p_embs[1].shape)
    print(p_embs[1,:].shape)
    return p_embs
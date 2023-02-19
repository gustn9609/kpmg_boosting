import torch
import torch.nn as nn
from transformers import AutoModel
from torch.nn import CrossEntropyLoss
from transformers.modeling_outputs import QuestionAnsweringModelOutput

class ExtractionModel(nn.Module):
    def __init__(self, arg, config):
        super(ExtractionModel, self).__init__()
        self.arg = arg
        self.transformer = AutoModel.from_pretrained(self.arg["model_name"], config=config)
        self.h_dim = self.transformer.config.hidden_size
        self.qa_outputs = nn.Linear(self.h_dim,2)

    def forward(self,
        input_ids,
        attention_mask,
        token_type_ids = None,
        start_positions = None,
        end_positions = None,
        labels = None,
    ):
        outputs = self.transformer(
            input_ids = input_ids,
            token_type_ids = token_type_ids,
            attention_mask = attention_mask,
            return_dict = True,
        )

        sequence_output = outputs[0]
        
        logits = self.qa_outputs(sequence_output)
        start_logits, end_logits = logits.split(1, dim=-1)
        start_logits = start_logits.squeeze(-1).contiguous()
        end_logits = end_logits.squeeze(-1).contiguous() 

        total_loss = None
        if start_positions is not None and end_positions is not None:
            # If we are on multi-GPU, split add a dimension
            if len(start_positions.size()) > 1:
                start_positions = start_positions.squeeze(-1)
            if len(end_positions.size()) > 1:
                end_positions = end_positions.squeeze(-1)
            # sometimes the start/end positions are outside our model inputs, we ignore these terms
            ignored_index = start_logits.size(1)
            start_positions = start_positions.clamp(0, ignored_index)
            end_positions = end_positions.clamp(0, ignored_index)

            loss_fct = CrossEntropyLoss(ignore_index=ignored_index)
            start_loss = loss_fct(start_logits, start_positions)
            end_loss = loss_fct(end_logits, end_positions)
            total_loss = (start_loss + end_loss) / 2
        
        return QuestionAnsweringModelOutput(
            loss=total_loss,
            start_logits=start_logits,
            end_logits=end_logits,
            hidden_states=outputs.hidden_states,
            attentions=outputs.attentions,
        )
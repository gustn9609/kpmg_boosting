import torch.nn as nn
from transformers import AutoModel


class SequenceClassificationModel(nn.Module):
    def __init__(self, args):
        super(SequenceClassificationModel, self).__init__()
        self.transformer = AutoModel.from_pretrained(
            args.model_name_or_path,
            add_pooling_layer=False
        )
        self.classifier = nn.Linear(in_features=768, out_features=1)
    
    def forward(self, input_ids, attention_mask, token_type_ids, labels=None):
        output = self.transformer(
            input_ids=input_ids,
            attention_mask=attention_mask,
            token_type_ids=token_type_ids,
            return_dict=True
        )
        output = output.last_hidden_state[:, 0, :]
        output = self.classifier(output)
        return output

from model.models import ExtractionModel
from transformers import AutoConfig, AutoModelForQuestionAnswering, AutoTokenizer
import torch

class ModelSelection():
    def __init__(self, config):
        self.config = config
        
        model_config = AutoConfig.from_pretrained(config["model_name"])
        self.tokenizer = AutoTokenizer.from_pretrained(config["model_name"], use_fast=True)
        self.model = ExtractionModel(config, model_config)
        if config["retrain"] == 1:
            self.model.load_state_dict(torch.load(config["retrain_path"]))
                
    def get_model(self): return self.model
    def get_tokenizer(self): return self.tokenizer
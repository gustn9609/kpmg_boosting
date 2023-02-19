import os
import yaml
import torch
import random
import numpy as np
import pandas as pd
from model.model_selection import ModelSelection
from trainer_qa import QuestionAnsweringTrainer
from preprocessing.preprocessor import ExtractionProcessor
from transformers import default_data_collator, TrainingArguments, EvalPrediction


## Set seed for random situation
def set_seed(random_seed):
    torch.manual_seed(random_seed)
    torch.cuda.manual_seed(random_seed)
    torch.cuda.manual_seed_all(random_seed)  # if use multi-GPU
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark = False
    np.random.seed(random_seed)
    random.seed(random_seed)
    
## Get config from yaml file
def get_config():
    with open("arg.yaml", "r") as f:
        args = yaml.load(f, Loader=yaml.Loader)
    return args

if __name__ == "__main__":
    set_seed(6)
    torch.cuda.empty_cache()
    
    config = get_config()
    device = torch.device(f"cuda" if torch.cuda.is_available() else "cpu")
    
    ## Model
    model_selection = ModelSelection(config)
    tokenizer = model_selection.get_tokenizer()
    model = model_selection.get_model()
    model.to(device)
    
    ## Data

    preprocessor = ExtractionProcessor(config, tokenizer)
        
    train_dataset = preprocessor.get_train_dataset()
    

    training_args = TrainingArguments(
        fp16=True,
        do_train=True,
        eval_steps=500,            
        logging_steps=100,
        logging_dir="./log",
        save_total_limit=2,
        learning_rate=config["lr"],
        output_dir=config["output_dir"],
        num_train_epochs=config["epoch"],
        weight_decay=config["weight_decay"],
        per_device_eval_batch_size=config["batch_size"],
        per_device_train_batch_size=config["batch_size"],
        label_names = ["start_positions", "end_positions"],
    )
    
    trainer = QuestionAnsweringTrainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        tokenizer=tokenizer,
        data_collator=default_data_collator,
        post_process_function=preprocessor.post_processing_function,
        compute_metrics=preprocessor.compute_metrics,
    )
    
    train_result = trainer.train()
    torch.save(model.state_dict(), config["model_save_path"])
    
    ## Evaluation
    metrics = trainer.evaluate()
    print(metrics)
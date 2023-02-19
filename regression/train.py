import os
import numpy
import torch
import wandb
import random
import argparse
import evaluate
import numpy as np
from typing import Dict
from args import get_parser
from model import SequenceClassificationModel
from dataset import SequenceClassificationDataset
from trainer import SequenceClassificationTrainer
from transformers import (
    AutoTokenizer,
    TrainingArguments,
)


def set_seed(random_seed):
    torch.manual_seed(random_seed)
    torch.cuda.manual_seed(random_seed)
    torch.cuda.manual_seed_all(random_seed)  # if use multi-GPU
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark = False
    np.random.seed(random_seed)
    random.seed(random_seed)

def compute_metrics(eval_pred):
    mse = evaluate.load("mse")
    logits, labels = eval_pred
    return mse.compute(predictions=logits, references=labels)


if __name__ == "__main__":
    set_seed(6)

    parser = get_parser()
    args = parser.parse_args()

    wandb.init(
        project=args.wandb_project,
        entity=args.wandb_entity,
        name=args.wandb_name,
        group=args.wandb_group,
    )

    model = SequenceClassificationModel(args)
    model.to(args.device)
    tokenizer = AutoTokenizer.from_pretrained(args.tokenizer_name_or_path)

    train_dataset = SequenceClassificationDataset(tokenizer, args)
    eval_dataset = SequenceClassificationDataset(tokenizer, args, eval=True)

    training_args = TrainingArguments(
        output_dir=args.output_dir,
        per_device_train_batch_size=args.batch_size,
        num_train_epochs=args.num_epochs,
        learning_rate=args.learning_rate,
        logging_steps=args.logging_steps,
        evaluation_strategy="steps",
        eval_steps=args.eval_steps,
        save_steps=args.save_steps,
        save_total_limit=args.save_total_limit,
    )
    trainer = SequenceClassificationTrainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=eval_dataset,
        tokenizer=tokenizer,
        compute_metrics=compute_metrics,
    )

    trainer.train()
    trainer.evaluate()
    trainer.save_model(output_dir=args.output_dir)

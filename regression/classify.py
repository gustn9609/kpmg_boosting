import os
import numpy
import torch
import wandb
import random
import argparse
import evaluate
import numpy as np
import torch.nn as nn
from tqdm import tqdm
from typing import Dict
from args import get_parser
from torch.utils.data import Dataset
from dataclasses import dataclass, field
from dataset import SequenceClassificationDataset
from transformers import (
    Trainer,
    AutoTokenizer,
    TrainingArguments,
    AutoModelForSequenceClassification,
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
    softmax = nn.Softmax(dim=-1)
    accuracy = evaluate.load("accuracy")
    precision = evaluate.load("precision")
    recall = evaluate.load("recall")
    f1 = evaluate.load("f1")
    roc_auc = evaluate.load("roc_auc")
    logits, labels = eval_pred
    predictions = np.argmax(logits, axis=-1)
    prediction_scores = softmax(torch.tensor(logits)).numpy()[:, -1]
    result = {}
    result.update(accuracy.compute(predictions=predictions, references=labels))
    result.update(precision.compute(predictions=predictions, references=labels))
    result.update(recall.compute(predictions=predictions, references=labels))
    result.update(f1.compute(predictions=predictions, references=labels))
    result.update(roc_auc.compute(
        prediction_scores=prediction_scores,
        references=labels,
    ))
    return result


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

    model = AutoModelForSequenceClassification.from_pretrained(
        pretrained_model_name_or_path=args.model_name_or_path,
        num_labels=args.num_labels,
    )
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
    trainer = Trainer(
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

import os
import torch
import wandb
import random
import argparse
import numpy as np
from tqdm import tqdm
from typing import Dict
from args import get_parser
from torch.utils.data import Dataset
from dataclasses import dataclass, field
from dataset import SequenceClassificationTestDataset
from transformers import (
    Trainer,
    AutoTokenizer,
    TrainingArguments,
    AutoModelForSequenceClassification,
)


if __name__ == "__main__":
    parser = get_parser()
    args = parser.parse_args()

    wandb.init(
        project=args.wandb_project,
        entity=args.wandb_entity,
        name=args.wandb_name,
        group=args.wandb_group,
    )

    model = AutoModelForSequenceClassification.from_pretrained(args.model_name_or_path)
    model.to(args.device)
    tokenizer = AutoTokenizer.from_pretrained(args.tokenizer_name_or_path)

    test_dataset = SequenceClassificationTestDataset(tokenizer, args)

    trainer = Trainer(
        model=model,
        tokenizer=tokenizer,
    )

    result = trainer.predict(test_dataset=test_dataset)
    print(result)

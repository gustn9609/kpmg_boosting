import os
import torch
import wandb
import random
import argparse
import evaluate
import numpy as np
from tqdm import tqdm
from typing import Dict
from args import get_parser
from dataset import NIKLNERDataset
from transformers import (
    Trainer,
    AutoTokenizer,
    TrainingArguments,
    AutoModelForTokenClassification,
    DataCollatorForTokenClassification,
)


ID2LABEL = {
    0: "-",
    1: "OG",
    2: "QT",
    3: "TR",
    4: "EV",
    5: "TM",
}
LABEL2ID = {
    "-": 0,
    "OG": 1,
    "QT": 2,
    "TR": 3,
    "EV": 4,
    "TM": 5,
}
NUM_LABELS = 6


def set_seed(random_seed):
    torch.manual_seed(random_seed)
    torch.cuda.manual_seed(random_seed)
    torch.cuda.manual_seed_all(random_seed)
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark = False
    np.random.seed(random_seed)
    random.seed(random_seed)

def compute_metrics(eval_pred):
    poseval = evaluate.load("poseval")
    logits, labels = eval_pred
    predictions = torch.argmax(torch.tensor(logits), dim=-1)
    new_labels = []
    new_predictions = []
    for i in range(labels.shape[0]):
        last_index = np.where(labels[i]==-100)[0]
        if last_index.size > 0:
            last_index = last_index[0]
        else:
            last_index = labels[i].shape[-1]
        new_labels.append([ID2LABEL[x.item()] if j < last_index else "pad" for j, x in enumerate(labels[i])])
        new_predictions.append([ID2LABEL[x.item()] if j < last_index else "pad" for j, x in enumerate(predictions[i])])
    return poseval.compute(predictions=new_predictions, references=new_labels)

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

    model = AutoModelForTokenClassification.from_pretrained(
        pretrained_model_name_or_path=args.model_name_or_path,
        num_labels=NUM_LABELS,
    )
    model.config.num_labels = NUM_LABELS
    model.config.id2label = ID2LABEL
    model.config.label2id = LABEL2ID
    model.to(args.device)
    tokenizer = AutoTokenizer.from_pretrained(args.tokenizer_name_or_path)

    train_dataset = NIKLNERDataset(args, tokenizer)
    eval_dataset = NIKLNERDataset(args, tokenizer, test=True)

    data_collator = DataCollatorForTokenClassification(
        tokenizer=tokenizer,
        padding=True,
        return_tensors="pt"
    )

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
        data_collator=data_collator,
        train_dataset=train_dataset,
        eval_dataset=eval_dataset,
        tokenizer=tokenizer,
        compute_metrics=compute_metrics,
    )

    trainer.train()
    trainer.evaluate()
    trainer.save_model(output_dir=args.output_dir)

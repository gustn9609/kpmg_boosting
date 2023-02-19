import torch
import numpy as np
import pandas as pd
from torch.utils.data import Dataset


### Dataset ###
class ParallelDatasetForMBart(Dataset):
    def __init__(self, config, tokenizer, eval=False):
        self.config = config
        if eval:
            dataset = pd.read_csv(config["eval_data_path"])
        else:
            dataset = pd.read_csv(config["train_data_path"])
        self.tokenizer = tokenizer

        if config["oneshot"] == 1:
            dataset = oneshotrand(config, dataset, tokenizer)
        elif config["oneshot"] == 2:
            dataset = oneshotsim(config, dataset, tokenizer)

        self.source = tokenizer(
            list(dataset["source"]),
            max_length=config["max_length"],
            padding="max_length",
            return_attention_mask=True,
            return_token_type_ids=True,
            return_tensors="pt",
        )
        self.labels = tokenizer(
            list(dataset["target"]),
            max_length=config["max_length"],
            padding="max_length",
            return_attention_mask=True,
            return_token_type_ids=True,
        )

    def __len__(self):
        return len(self.source["input_ids"])

    def __getitem__(self, idx):
        return {
            "input_ids": self.source["input_ids"][idx],
            "attention_mask": self.source["attention_mask"][idx],
            "labels": torch.tensor([self.tokenizer.bos_token_id] + self.labels["input_ids"][idx]),
        }


class ParallelDatasetForT5(Dataset):
    def __init__(self, config, tokenizer, eval=False):
        self.config = config
        if eval:
            dataset = pd.read_csv(config["eval_data_path"])
        else:
            dataset = pd.read_csv(config["train_data_path"])
        self.tokenizer = tokenizer

        if config["oneshot"] == 1:
            dataset = oneshotrand(config, dataset, tokenizer)
        elif config["oneshot"] == 2:
            dataset = oneshotsim(config, dataset, tokenizer)

        src_seq, tgt_seq, attention = [], [], []

        for s, t in zip(dataset["source"], dataset["target"]):
            s = tokenizer.encode(s, add_special_tokens=False)
            t = tokenizer.encode(t, add_special_tokens=False)

            if len(s) > config["max_length"] - 1:
                s = s[: config["max_length"] - 1] + [tokenizer.eos_token_id]
                att = [1 for _ in range(config["max_length"])]
            else:
                att = [1 for _ in range(len(s) + 1)] + [0 for _ in range(config["max_length"] - 1 - len(s))]
                s = (
                    s
                    + [tokenizer.eos_token_id]
                    + [tokenizer.pad_token_id for _ in range(config["max_length"] - 1 - len(s))]
                )

            if len(t) > config["max_length"] - 2:
                t = [tokenizer.bos_token_id] + t[: config["max_length"] - 2] + [tokenizer.eos_token_id]
            else:
                t = (
                    [tokenizer.bos_token_id]
                    + t
                    + [tokenizer.eos_token_id]
                    + [tokenizer.pad_token_id for _ in range(config["max_length"] - 2 - len(t))]
                )

            src_seq.append(s)
            tgt_seq.append(t)
            attention.append(att)
        self.source = src_seq
        self.labels = tgt_seq
        self.attention_mask = attention

    def __len__(self):
        return len(self.source)

    def __getitem__(self, idx):
        return {
            "input_ids": torch.tensor(self.source[idx]),
            "attention_mask": torch.tensor(self.attention_mask[idx]),
            "labels": torch.tensor([self.tokenizer.bos_token_id] + self.labels[idx]),
        }


def collate_fn(batch):
    input = []
    attention = []
    labels = []
    for b in batch:
        input.append(b["input_ids"].unsqueeze(0))
        attention.append(b["attention_mask"].unsqueeze(0))
        labels.append(b["labels"].unsqueeze(0))
    return {
        "input_ids": torch.cat(input, 0),
        "attention_mask": torch.cat(attention, 0),
        "labels": torch.cat(labels, 0),
    }  # Shape: (batch_size, max length)


def oneshotrand(config, dataset, tokenizer):
    example_dataset = pd.read_csv(config["train_data_path"])
    newsource = []
    prefixsc = "순화된 표현으로 변환: "
    for i in range(len(dataset)):
        k = i
        while k == i:
            k = np.random.randint(len(example_dataset))
            if eval:
                break
        newsource.append(
            prefixsc
            + example_dataset.iloc[k]["source"]
            + " > "
            + example_dataset.iloc[k]["target"]
            + tokenizer.sep_token
            + dataset.iloc[i]["source"]
            + " > "
        )
    dataset["source"] = newsource

    return dataset


def oneshotsim(config, dataset, tokenizer):
    newsource = []
    prefixsc = "순화된 표현으로 변환: "
    for i in range(len(dataset)):
        newsource.append(
            prefixsc
            + dataset.iloc[i]["example_source"]
            + " > "
            + dataset.iloc[i]["example_target"]
            + tokenizer.sep_token
            + dataset.iloc[i]["source"]
            + " > "
        )
    dataset["source"] = newsource

    return dataset

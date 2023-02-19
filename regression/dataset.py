import torch
from datasets import *
from torch.utils.data import Dataset


class SequenceClassificationDataset(Dataset):
    def __init__(self, tokenizer, args, eval=False):
        self.data = load_from_disk(args.data_path)
        if eval:
            self.data = self.data["validation"]
        else:
            self.data = self.data["train"]
        self.encoded_data = self.preprocess(tokenizer)

    def __len__(self):
        return self.data.num_rows

    def __getitem__(self, i):
        return {
            "input_ids": self.encoded_data["input_ids"][i],
            "attention_mask": self.encoded_data["attention_mask"][i],
            "token_type_ids": self.encoded_data["token_type_ids"][i],
            "labels": self.encoded_data["labels"][i],
        }

    def preprocess(self, tokenizer):
        encoded_data = []
        input_sentences = tokenizer(
            list(map(lambda t: f"{t[0]} [SEP] {t[1]}", zip(self.data["question"], self.data["field"]))),
            self.data["answer"],
            max_length=512,
            padding="max_length",
            truncation="only_second",
            return_tensors="pt",
        )
        return {
            "input_ids": input_sentences["input_ids"],
            "attention_mask": input_sentences["attention_mask"],
            "token_type_ids": input_sentences["token_type_ids"],
            "labels": torch.tensor(self.data["score"]).type(torch.float32),
        }


class SequenceClassificationTestDataset(Dataset):
    def __init__(self, tokenizer, args):
        self.data = load_from_disk(args.data_path)
        self.encoded_data = self.preprocess(tokenizer)

    def __len__(self):
        return self.data.num_rows

    def __getitem__(self, i):
        return {
            "input_ids": self.encoded_data["input_ids"][i],
            "attention_mask": self.encoded_data["attention_mask"][i],
            "token_type_ids": self.encoded_data["token_type_ids"][i],
            "labels": None,
        }

    def preprocess(self, tokenizer):
        input_sentences = tokenizer(
            list(map(lambda t: f"{t[0]} [SEP] {t[1]}", zip(self.data["question"], self.data["field"]))),
            self.data["answer"],
            max_length=512,
            padding="max_length",
            truncation="only_second",
            return_tensors="pt",
        )
        return {
            "input_ids": input_sentences["input_ids"],
            "attention_mask": input_sentences["attention_mask"],
            "token_type_ids": input_sentences["token_type_ids"] if input_sentences.get("token_type_ids") else None,
            "labels": None,
        }

import json
from datasets import *
from collections import deque
from torch.utils.data import Dataset


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


class NIKLNERDataset(Dataset):
    def __init__(self, args, tokenizer, test=False):
        self.args = args
        self.tokenizer = tokenizer
        if test:
            self.data = load_from_disk(args.data_path)["test"]
        else:
            self.data = load_from_disk(args.data_path)["train"]

    def __len__(self):
        return self.data.num_rows

    def __getitem__(self, idx):
        return {
            "input_ids": self.data[idx]["input_ids"],
            "attention_mask": self.data[idx]["attention_mask"],
            "token_type_ids": self.data[idx]["token_type_ids"],
            "labels": list(map(lambda x: LABEL2ID[x], self.data[idx]["labels"])),
        }

import json
import pandas as pd
from tqdm import tqdm
from datasets import *
from itertools import chain
from kss import split_sentences
from args import get_parser
from typing import Dict, List, Union


def preprocess(json_path: str):
    with open(json_path, "r") as f:
        data = json.load(f)
    reformatted = {"id": [], "field": [], "question": [], "answer": [], "label": []}
    for k, v in tqdm(data.items()):
        for i, q in enumerate(v["questions"]):
            for j, a in enumerate(v["answers"][i]):
                sentences = split_sentences(a)
                reformatted["id"].extend([int(k)] * len(sentences))
                reformatted["field"].extend([v["field"]] * len(sentences))
                reformatted["question"].extend([q] * len(sentences))
                reformatted["answer"].extend(sentences)
                reformatted["label"].extend([v["labels"][i][j]] * len(sentences))
    return reformatted

def save_to_arrow(data: Dict[str, Union[int, str, Dict[str, Union[str, int]]]]):
    new_dataset = Dataset.from_dict(data)
    new_dataset = new_dataset.train_test_split(test_size=0.1)
    new_dataset = DatasetDict({"train": new_dataset["train"], "validation": new_dataset["test"]})
    print(new_dataset)
    new_dataset.save_to_disk(args.save_dir)


if __name__ == "__main__":
    parser = get_parser()
    args = parser.parse_args()
    save_to_arrow(preprocess(args.json_path))

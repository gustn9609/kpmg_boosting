import json
import pandas as pd
from tqdm import tqdm
from datasets import *
from itertools import chain
from args import get_parser
from kss import split_sentences
from typing import Dict, List, Union


def preprocess(json_path: str):
    with open(json_path, "r") as f:
        data = json.load(f)
    reformatted = {"id": [], "field": [], "score": [], "question": [], "answer": []}
    for k, v in tqdm(data.items()):
        for i, q in enumerate(v["questions"]):
            answer = ' '.join(v["answers"][i]).replace("\n", " ")
            if answer:
                reformatted["id"].append(int(k))
                reformatted["field"].append(v["field"])
                reformatted["score"].append(v["score"])
                reformatted["question"].append(q)
                reformatted["answer"].append(answer)
    return reformatted

def save_to_arrow(data: Dict[str, Union[int, str, Dict[str, Union[str, int]]]]):
    new_dataset = Dataset.from_dict(data)
    new_dataset = new_dataset.train_test_split(test_size=0.1, shuffle=False)
    new_dataset = DatasetDict({"train": new_dataset["train"], "validation": new_dataset["test"]})
    print(new_dataset)
    new_dataset.save_to_disk(args.save_dir)


if __name__ == "__main__":
    parser = get_parser()
    args = parser.parse_args()
    save_to_arrow(preprocess(args.json_path))

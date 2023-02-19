import json
import pandas as pd
from tqdm import tqdm
from datasets import *
from args import get_parser
from itertools import chain
from kss import split_sentences
from typing import Dict, List, Union


def preprocess(json_path: str):
    with open(json_path, "r") as f:
        data = json.load(f)
    reformatted = {"id": [], "field": [], "score": [], "question": [], "answer": [], "label": []}
    for k, v in tqdm(data.items()):
        for i, q in enumerate(v["questions"]):
            for j, a in enumerate(v["answers"][i]):
                sentences = []
                for s in a.split("\n\n"):
                    if not s:
                        continue
                    if len(s) > 700:
                        s_wo_newline = [t for t in s.split("\n") if t]
                        for t in s_wo_newline:
                            if len(t) > 700:
                                t_split = [u for u in split_sentences(t) if u]
                                t1 = ' '.join(t_split[:len(t_split) // 2])
                                t2 = ' '.join(t_split[len(t_split) // 2:])
                                sentences.append(t1)
                                sentences.append(t2)
                            else:
                                sentences.append(t)
                    else:
                        sentences.append(s)
                reformatted["id"].extend([int(k)] * len(sentences))
                reformatted["field"].extend([v["field"]] * len(sentences))
                reformatted["score"].extend([v["score"]] * len(sentences))
                reformatted["question"].extend([q] * len(sentences))
                reformatted["answer"].extend(sentences)
                reformatted["label"].extend([v["labels"][i][j]] * len(sentences))
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

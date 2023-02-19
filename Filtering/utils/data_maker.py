import yaml
import json
import wandb
import torch
import random
import numpy as np
import pandas as pd
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from transformers import (
    AutoTokenizer,
    AutoModel,
    AutoConfig,
    is_torch_available,
)


def set_seed(seed):
    random.seed(seed)
    np.random.seed(seed)
    if is_torch_available():
        torch.manual_seed(seed)
        torch.cuda.manual_seed(seed)
        torch.cuda.manual_seed_all(seed)
        torch.backends.cudnn.deterministic = True
        torch.backends.cudnn.benchmark = False


def make_data():
    print("---------------------------")
    ## get data
    with open("./dataset/news_data.json", "r") as file:
        data = json.load(file)
        
    df = pd.DataFrame()
    df_cls = pd.DataFrame()
    
    document_length = len(data["document"])
    document = data["document"]
    
    for i in range(document_length):
        sentence_length = len(document[i]["sentence"])
        sentence = document[i]["sentence"]
        
        for j in range(sentence_length):
            word_length = len(sentence[j]["NE"])
            word = sentence[j]["NE"]

            now_text = sentence[j]["form"]
            
            for k in range(word_length):
                if word[k]["label"] in ["PS_NAME", "QT_AGE", "QT_PHONE"]:
                    now_data = {
                        "context": now_text,
                        "answers": {"answer_start": [word[k]["begin"]], "text": [word[k]["form"]]}
                    }

                    df = df.append(now_data, ignore_index=True)
            
    ## save data
    df.to_csv("filter_data.csv", index=False)
    
    return


if __name__ == "__main__":
    set_seed(6)
    torch.cuda.empty_cache()
    device = "cuda" if torch.cuda.is_available() else "cpu"
    
    make_data()
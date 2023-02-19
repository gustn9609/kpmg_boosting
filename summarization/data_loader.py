# AI HUB에서 다운받은 dataset 그대로 사용하면 된다. 

from datasets import Dataset, DatasetDict
# from typing import Dict, List
import json
import pandas as pd
# from model import load_model_tokenizer
# from logger import set_logging

# logger = set_logging('train')
# model, tokenizer = load_model_tokenizer(logger)

path = '/opt/ml/input/summarization/data'

# json 형식 파일을 불러오는 함수
def load_json(path):
    with open(path) as f:
        data = json.load(f)

    return data


# 대화ID, 대화, 요약 정보 추출
def load_data(path):
    data = load_json(path)
    documents = data['documents']
    dialogue = []
    summary = []
    for doc in documents:
        # print(datas)
        tmp = ''.join([' '.join([ds['sentence'] for ds in sublist]) for sublist in doc['text']])
        summary.append(doc['abstractive'][0])
        dialogue.append(tmp)
    data = {}
    # data['ID'] = dialogueID
    data['dialogue'] = dialogue
    data['summary'] = summary
    data = Dataset.from_pandas(pd.DataFrame(data))
    print('a yo', len(data['dialogue']))
    print('a to',len(data['summary']))
    # print(data['summary'])

    return data
    
# print(load_data(path))

# 모든 dataset을 합치고 Dataset 형태로 반환
def load_and_concat_dataset(path: str):
    train_datasets = load_data(path + '/train_original.json')
    valid_datasets = load_data(path + '/valid_original.json')
    datasets = DatasetDict({'train' : train_datasets, 'validation' : valid_datasets})

    return datasets
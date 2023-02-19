from datasets import load_from_disk
import pandas as pd

def get_corpus_df(PATH):
    data = load_from_disk(PATH +'/preprocessed')
    df = pd.DataFrame(data['validation'])
    new_df = df.groupby('id').agg({
        'field': 'first',
        'question': lambda x: ' '.join(x),
        'answer': lambda x: ' '.join(x),
        'label': 'first'
    }).reset_index()
    corpus = list([example['answer'] for idx,example in new_df.iterrows()])
    return corpus, new_df
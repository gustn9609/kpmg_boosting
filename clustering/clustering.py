from transformers import AutoTokenizer
import numpy as np

import random
import torch
import os
import pandas as pd
from load_data import get_corpus_df
from embedding import train
from models import BertEncoder
torch.manual_seed(42)
torch.cuda.manual_seed(42)
np.random.seed(42)
random.seed(42)
import faiss
# 1. Clustering
def main(args):
  emb_dim = p_embs.shape[-1]
  index_flat = faiss.IndexFlatL2(emb_dim)

  clus = faiss.Clustering(emb_dim, args['num_clusters'])
  clus.verbose = True
  clus.niter = args['niter']
  clus.train(p_embs, index_flat)
  centroids = faiss.vector_float_to_array(clus.centroids)
  centroids = centroids.reshape(args['num_clusters'], emb_dim)
  index_flat.add(centroids)
  distances, cluster_labels = index_flat.search(p_embs, 1)
  # cluster_labels = faiss.vector_to_array(clus.assignments).reshape(-1)
  print('labels can be maded',cluster_labels)
  # print('centroids outuput', centroids)
  # print('clus outuput', clus)
  print(f'embedding dim {emb_dim} and len of corpus = {len(corpus)}')

  # D, I = index_flat.search(p_embs, 1)


  ## output 결과 확인하기 ##
  new_df['cluster'] = cluster_labels.reshape(-1)

  print('군집결과')
  print(new_df)
  a = input('down 하실?')
  if a=='y':
      new_df.to_csv('군집.csv',index=False)
  return index_flat


def get_relevent_top5(user_id,index_flat):
  idx = new_df[new_df['id']==user_id].index
  distances, index = index_flat.search(p_embs[idx], 5)
  output = new_df[index]
  return output
if __name__=='__main__':
   # Load YOUR DATA for clustering
  PATH = 'YOUR PATH'
  corpus, new_df = get_corpus_df(PATH)
  print(len(corpus))
  # Construt dataloader
  p_embs = train(corpus)
  args = {'num_clusters' : 20,
          'niter' : 5,
          'k' : 5
  }
  index = main(args)
  user_id = random.choice(new_df['id'].unique())
  output = get_relevent_top5(user_id, index)
  print(output)

# 유사한것 기준으로 찾고 싶을 때
# q_emb = q_emb.astype(np.float32)
# D, I = self.indexer.search(q_emb, k)

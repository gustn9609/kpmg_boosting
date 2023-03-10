import itertools

import numpy as np
from konlpy.tag import Mecab
from sentence_transformers import SentenceTransformer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from collections import Counter

def get_embeddings(text, candidates):
    ## 다국어 모델을 사용했고 SOTA 모델을 사용함에 따라 성능 개선 여지 있음
    ## xlm
    model = SentenceTransformer("sentence-transformers/xlm-r-100langs-bert-base-nli-stsb-mean-tokens")
    _ = model.eval()

    doc_embedding = model.encode([text])
    candidate_embeddings = model.encode(candidates)
    return doc_embedding, candidate_embeddings


def make_candidates(text):
    mecab = Mecab()
    tokenized_doc = mecab.pos(text)
    tokenized_nouns = " ".join(
        [word[0] for word in tokenized_doc if word[1] in ["NNP", "NNG", "SL"]]
    )  # 일반명사, 고유명사, 외국어
    ## 입력 중 명사가 하나도 없을 경우 빈 리스트 반환
    if len(tokenized_nouns) == 0:
        return [""]

    n_gram_range = (1, 1)
    count = CountVectorizer(ngram_range=n_gram_range, token_pattern=r"(?u)\b\w+\b").fit([tokenized_nouns])
    candidates = count.get_feature_names_out()
    return candidates


def basic_keybert(doc_embedding, candidate_embeddings, candidates, top_n):
    distances = cosine_similarity(doc_embedding, candidate_embeddings)
    keywords = [candidates[index] for index in distances.argsort()[0][-top_n:]]
    return keywords

## Max Sum Similarity
def max_sum_sim(doc_embedding, candidate_embeddings, words, top_n, nr_candidates):
    # 문서와 각 키워드들 간의 유사도
    distances = cosine_similarity(doc_embedding, candidate_embeddings)

    # 각 키워드들 간의 유사도
    distances_candidates = cosine_similarity(candidate_embeddings, candidate_embeddings)

    # 코사인 유사도에 기반하여 키워드들 중 상위 top_n개의 단어를 pick.
    ## 상대적으로 높은 nr_candidates는 더 다양한 키워드를 만든다.
    words_idx = list(distances.argsort()[0][-nr_candidates:])
    words_vals = [words[index] for index in words_idx]
    distances_candidates = distances_candidates[np.ix_(words_idx, words_idx)]

    # 각 키워드들 중에서 가장 덜 유사한 키워드들간의 조합을 계산
    min_sim = np.inf
    candidate = None
    for combination in itertools.combinations(range(len(words_idx)), top_n):
        sim = sum([distances_candidates[i][j] for i in combination for j in combination if i != j])
        if sim < min_sim:
            candidate = combination
            min_sim = sim

    if candidate:
        keywords = [words_vals[idx] for idx in candidate]
        return keywords
    else:
        return None

## Maximal Marginal Relevance
def mmr(doc_embedding, candidate_embeddings, words, top_n, diversity):

    # 문서와 각 키워드들 간의 유사도가 적혀있는 리스트
    word_doc_similarity = cosine_similarity(candidate_embeddings, doc_embedding)

    # 각 키워드들 간의 유사도
    word_similarity = cosine_similarity(candidate_embeddings)

    # 문서와 가장 높은 유사도를 가진 키워드의 인덱스를 추출.
    # 만약, 2번 문서가 가장 유사도가 높았다면
    # keywords_idx = [2]
    keywords_idx = [np.argmax(word_doc_similarity)]

    # 가장 높은 유사도를 가진 키워드의 인덱스를 제외한 문서의 인덱스들
    # 만약, 2번 문서가 가장 유사도가 높았다면
    # ==> candidates_idx = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10 ... 중략 ...]
    candidates_idx = [i for i in range(len(words)) if i != keywords_idx[0]]

    # 최고의 키워드는 이미 추출했으므로 top_n-1번만큼 아래를 반복.
    # ex) top_n = 5라면, 아래의 loop는 4번 반복됨.
    for _ in range(top_n - 1):
        candidate_similarities = word_doc_similarity[candidates_idx, :]
        target_similarities = np.max(word_similarity[candidates_idx][:, keywords_idx], axis=1)

        # MMR을 계산
        mmr = (1 - diversity) * candidate_similarities - diversity * target_similarities.reshape(-1, 1)
        mmr_idx = candidates_idx[np.argmax(mmr)]

        # keywords & candidates를 업데이트
        keywords_idx.append(mmr_idx)
        candidates_idx.remove(mmr_idx)

    if keywords_idx:
        keywords = [words[idx] for idx in keywords_idx]
        return keywords
    else:
        return "None"

## text가 입력되면 keyword를 추출합니다.
def get_keyword(text: str, top_n: int = 5):
    candidates = make_candidates(text)
    doc_embedding, candidate_embeddings = get_embeddings(text, candidates)

    results = list()
    result_1 = basic_keybert(doc_embedding, candidate_embeddings, candidates, top_n=top_n)
    results.append(result_1)
    result_2 = max_sum_sim(doc_embedding, candidate_embeddings, candidates, top_n=top_n, nr_candidates=top_n * 2)
    results.append(result_2)
    result_3 = mmr(doc_embedding, candidate_embeddings, candidates, top_n=top_n, diversity=0.8)
    results.append(result_3)

    unique_keywords = []
    for result in results:
        unique_keywords.extend(result)

    print(result_1, result_2, result_3)

    keyword = list(set(unique_keywords))

    return keyword

def show_wordcloud(keyword: list):

    keyword_counter = Counter(keyword)
    ## 한글이 깨지지 않게 글씨체가 저장되어 있는 경로인 font_path를 알맞게 바꿔서 지정해야함.
    wc = WordCloud(font_path = '/opt/ml/input/BMDOHYEON_ttf.ttf',width=400, height=400, scale=2.0, max_font_size=250)
    gen = wc.generate_from_frequencies(keyword_counter)
    plt.figure()
    plt.imshow(gen)
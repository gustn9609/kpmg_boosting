# 🚀 Boosting - 자연어 모델을 활용한 HR Analytics
<p align="center">
  <img width=300 src=https://user-images.githubusercontent.com/105059564/219948000-5174245a-ac16-4bc4-b3e8-32028dcee6a5.svg>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white">
  <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=Pytorch&logoColor=white">
  <img src="https://img.shields.io/badge/FAISS-4080B4?style=for-the-badge&logoColor=black">
  <img src="https://img.shields.io/badge/Transformers-F0DB4E?style=for-the-badge&logoColor=black">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
</p>

팀 Boosting은 자연어 모델을 활용해, 기업의 HR Analytics를 돕는 서비스를 제시합니다.

## Background



## Features
### 채용 - 문단별 요약
[🔗 Directory](https://github.com/gustn9609/kpmg_boosting/tree/main/summarization)

[comment]: <> (한정된 시간과 인력으로, 다수의 지원서를 면밀히 검토하는 것은 매우 어렵고 비효율적입니다.)

```BART```를 활용한 텍스트 요약으로, 지원서 원문을 이해하기 쉽고 가치 있는 정보로 변환합니다. 지원서의 핵심 부분을 요약하여 제시한다면 기업은 빠르게 원하는 역량을 갖춘 인재를 찾을 수 있습니다.

### 채용 - 키워드 추출
[🔗 Directory](https://github.com/gustn9609/kpmg_boosting/tree/main/KeyBERT)

[comment]: <> (지원서의 키워드를 추출하여, 간단한 정보만으로 지원자의 성향과 경험을 파악할 수 있습니다. 자연어 모델을 통해, 기존의 단순 단어 일치 여부를 지표로 하는 알고리즘을 넘어, 보다 의미있는 결과물을 도출하고자 합니다.)

```KeyBERT```와 ```Max Sum Similarity```, ```Maximal Marginal Relevance``` 알고리즘을 활용해, 지원자의 다양한 핵심 역량을 명확히 나타내는 키워드를 추출합니다. 원문에 비해 매우 짧은 단어들만 보고도, 인사 담당자는 지원자에 대한 핵심 정보를 빠르게 인지할 수 있습니다.


### 채용 - 지원자 군집화
[🔗 Directory](https://github.com/gustn9609/kpmg_boosting/tree/main/clustering)

[comment]: <> (다수의 지원자의 특성을 모두 기억하는 것은 불가능합니다. 이미 보았던 정보를 다시 확인하는 과정은 채용 과정 중 비효율을 초래합니다.)

```BERT```를 활용해 지원서 임베딩을 도출하고, ```FAISS```의 MIPS 알고리즘을 통해 유사한 지원자를 군집화합니다.

### 채용 - 개인정보 비식별화

[comment]: <> (직무와 무관한 개인정보 및 블라인드 항목을 검토하기 위해서는 많은 시간을 소모해야 하며, 채용 담당자가 해당 항목을 보는 경우, 지원자에 대한 공정하지 못한 평가가 이루어질 수 있습니다.)

```BERT```를 활용한 ```span classification```을 통해, 평가에 영향을 줄 수 있는 개인정보 및 블라인드 항목을 마스킹합니다.

### 채용 - 개체명 인식
[🔗 Directory](https://github.com/gustn9609/kpmg_boosting/tree/main/ner)

[comment]: <> (지원서는 지원자의 세부 역량을 살펴보기 위한 수단이지만, 모든 지원서를 상세히 읽는 것은 불가능합니다. 긴 지원서에서 기업이 원하는 역량을 찾기 위해서는 많은 시간이 소모됩니다.)

```BERT```를 활용한 개체명 인식을 통해, Job Description에서 제시하는 항목 (추가 바람)

### 채용 - 텍스트 회귀
[🔗 Directory](https://github.com/gustn9609/kpmg_boosting/tree/main/regression)

[comment]: <> (지원서는 지원자의 세부 역량을 살펴보기 위한 수단이지만, 모든 지원서를 상세히 읽는 것은 불가능합니다. 긴 지원서에서 기업이 원하는 역량을 찾기 위해서는 많은 시간이 소모됩니다.)

```BERT```를 활용해, 지원서 질문 및 직군 정보를 바탕으로 지원서가 얼마나 관련 역량을 잘 서술하고 있는지를 수치화합니다. 

### 평가 - 감성 분석
[🔗 Directory](https://github.com/gustn9609/kpmg_boosting/tree/main/sentiment)

```BERT```를 활용하여 긍/부정과 감사, 분노 등 동료 평가 텍스트에 담긴 주요 감정을 제시합니다. 무분별한 비난을 담은 평가가 오가지 않고, 동료 평가가 발전과 피드백의 역할을 수행할 수 있도록 합니다.

### 평가 - 순화
[🔗 Directory](https://github.com/gustn9609/kpmg_boosting/tree/main/generation)

```BART```를 활용해 비꼬거나 혐오 표현을 담은 동료 평가 텍스트를 순화합니다.

## Demo

## Members
| [김한성](https://github.com/dataKim1201) | [김현수](https://github.com/gustn9609) | [박승현](https://github.com/koohack) | [설유민](https://github.com/ymnseol) | [최동민](https://github.com/unknownburphy) |
|:-:|:-:|:-:|:-:|:-:|
| 군집화<br>문서 요약 | 감성분석<br>프로젝트 기획 | 순화<br>자연어 추론<br>프로토타입 개발 | 개체명 분석<br>텍스트 회귀 | 키워드 추출<br>프로젝트 기획 |

import re
import json
import argparse
import pandas as pd
from args import get_parser
from selenium import webdriver
from typing import Dict, List, Union
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException


def count_n_pages(driver: webdriver.Chrome) -> int:
    total_n_pages = int(re.sub("[^\d]", "", driver.find_element(By.XPATH, "/html/body/div[5]/div[2]/div[2]/div[4]/h4/span[2]").text))
    document_list = driver.find_element(By.XPATH, "/html/body/div[@id='wrap']/div[@id='container']/div[@class='stContainer']/div[@class='starListsWrap ctTarget']/ul[@class='selfLists']")
    max_n_rows = len(document_list.find_elements(By.TAG_NAME, "li"))
    n_pages = total_n_pages // max_n_rows
    print(f"crawl.py > count_n_pages: Count the number of pages successfully. The number of pages is {n_pages}")
    return n_pages

def login(driver: webdriver.Chrome, args: argparse.Namespace) -> None:
    try:
        driver.get("https://www.jobkorea.co.kr/")
        driver.implicitly_wait(0.5)
        driver.find_element(By.XPATH,"/html/body/div[5]/div/div[1]/div[1]/ul/li[1]/button").click()
        driver.find_element(By.ID,"lb_id").send_keys(args.jobkorea_id)
        driver.find_element(By.ID,"lb_pw").send_keys(args.jobkorea_password)
        driver.find_element(By.XPATH,"/html/body/div[5]/div/div[1]/div[1]/ul/li[1]/div/form/fieldset/div[1]/button").click()
        driver.implicitly_wait(0.5)
        print("crawl.py > login: Log in successfully.")
    except:
        print("crawl.py > login: Already logged in.")

def close_popup(driver: webdriver.Chrome) -> None:
    try:
        driver.find_element(By.XPATH, "/html/body/div[6]/div/button").click()
        print("crawl.py > close_popup: Close a pop-up window successfully.")
    except:
        print("crawl.py > close_popup: Already visited.")

def crawl_urls(driver: webdriver.Chrome) -> List[str]:
    urls = []
    prefix = "https://www.jobkorea.co.kr/starter/PassAssay?FavorCo_Stat=0&Pass_An_Stat=1&OrderBy=0&EduType=0&WorkType=0&isSaved=0"
    driver.get(prefix)
    driver.implicitly_wait(0.5)
    close_popup(driver)
    n_pages = count_n_pages(driver)
    for page in range(1, n_pages + 1):
        try:
            driver.get(f"{prefix}&Page={page}")
            driver.implicitly_wait(0.5)
            close_popup(driver)
            document_list = driver.find_element(By.XPATH, "/html/body/div[@id='wrap']/div[@id='container']/div[@class='stContainer']/div[@class='starListsWrap ctTarget']/ul")
            
            hyperlinks = document_list.find_elements(By.TAG_NAME, "a")
            for hyperlink in hyperlinks:
                url = hyperlink.get_attribute("href")
                if "selfintroduction" in url:
                    continue
                urls.append(url.split("?")[0])
        except:
            print(f"crawl.py > crawl_urls: Error occurred.")
    urls = list(set(urls))
    print(f"crawl.py > crawl_urls: Crawl urls successfully. The number of urls is {len(urls)}")
    return urls

def crawl_documents(driver: webdriver.Chrome, urls: List[str]) -> Dict[str, Dict[str, Union[int, str, List[Union[int, str]]]]]:
    documents = dict()
    for i, url in enumerate(urls):
        try:
            print(f"crawl.py > crawl_documents: Crawl the document {i}")
            document_field = None
            document_score = None
            document_question_elements = []
            document_questions = []
            document_answer_elements = []
            document_answers = []
            document_labels = []
            # try:
            driver.get(url)
            document_field = driver.find_element(By.XPATH, "/html/body/div[5]/div[2]/div[2]/div[1]/div[1]/h2/em").text
            document_score = int(driver.find_element(By.XPATH, "/html/body/div[5]/div[2]/div[2]/div[2]/div/span").text)
            document = driver.find_element(By.CLASS_NAME, "qnaLists")
            questions = document.find_elements(By.TAG_NAME, "dt")
            for content in questions:
                question = content.find_element(By.CLASS_NAME, "tx")
                if not question.text:
                    content.find_element(By.TAG_NAME, "button").click()
                    question = content.find_element(By.CLASS_NAME, "tx")
                document_question_elements.append(question)
            answers = document.find_elements(By.TAG_NAME, "dd")
            for j, content in enumerate(answers):
                answer = content.find_element(By.CLASS_NAME, "tx")
                if not answer.text:
                    questions[j].find_element(By.TAG_NAME, "button").click()
                    answer = content.find_element(By.CLASS_NAME, "tx")
                good_sentences = answer.find_elements(By.CLASS_NAME, "good")
                bad_sentences = answer.find_elements(By.CLASS_NAME, "bad")
                document_answer_elements.append(good_sentences + bad_sentences)
                document_labels.append([1] * len(good_sentences) + [0] * len(bad_sentences))
            document_questions = [element.text for element in document_question_elements]
            for elements in document_answer_elements:
                temp = [re.sub(r"(좋은점 \d+)|(아쉬운점 \d+)", "", element.text) for element in elements]
                document_answers.append(temp)
            documents[i] = {
                "field": document_field,
                "score": document_score,
                "questions": document_questions,
                "answers": document_answers,
                "labels": document_labels
                }
        except Exception as e:
            print(f"crawl.py > crawl_documents: Error occurred - {e}")

    return documents

def convert_documents_to_json(documents: Dict[str, Dict[str, Union[int, str, List[Union[int, str]]]]], args: argparse.Namespace) -> None:
    with open(args.save_dir, "w") as f:
        json.dump(documents, f, ensure_ascii=False)
    print(f"crawl.py > convert_documents_to_json: Save successfully as {args.save_dir}")

if __name__ == "__main__":
    parser = get_parser()
    args = parser.parse_args()

    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(args.chromedriver, options=options)

    login(driver, args)
    urls = crawl_urls(driver)
    documents = crawl_documents(driver, urls)
    convert_documents_to_json(documents, args)

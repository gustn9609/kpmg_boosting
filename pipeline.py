from boosting.kpmg.crawling import *
from tqdm import tqdm

from selenium import webdriver
import pendulum

import airflow
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.utils.dates import days_ago

from datetime import datetime, timedelta
from pathlib import Path



def crawl_link(**context):
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')

    driver = webdriver.Chrome("/opt/ml/chromedriver", options = options)

    result = link_crawl(driver)
    context['task_instance'].xcom_push(key = 'urls', value = result)


def crawl_cover_letter(**context):
    """
    driver의 경우, 재선언을 해줘야한다. Selenium.webdriver는 serializable이 불가능하다.
    """
    root_dir = "/opt/ml/data"
    utc_time = pendulum.now().to_datetime_string()
    

    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')

    driver = webdriver.Chrome("/opt/ml/chromedriver", options = options)
    
    urls = context['task_instance'].xcom_pull(key = 'urls')

    login_protocol(driver = driver)

    cnt = 0
    fpath = Path(os.path.join(root_dir, utc_time, "major_jobkorea_crawl.txt"))
    fpath.parent.mkdir(parents = True, exist_ok = True)
    file_save = open(str(fpath), "w")
    for url in tqdm(urls):
        file_save = self_introduction_crawl(driver, url, file_save)
        
    file_save.close()
    print("[Crawl Success]")




local_tz = pendulum.timezone("Asia/Seoul")

default_args = {
    'owner': 'hwanseung2',
    'depends_on_past': False,  # 이전 DAG의 Task가 성공, 실패 여부에 따라 현재 DAG 실행 여부가 결정. False는 과거의 실행 결과 상관없이 매일 실행한다
    'start_date': datetime(2023, 1, 24, 9, tzinfo=local_tz), #datetime(2023, 1, 20),
    'retires': 5,
    'retry_delay': timedelta(minutes=5)  # 만약 실패하면 5분 뒤 재실행
}

with DAG(dag_id = 'ETLPipeline', default_args = default_args, schedule_interval = '55 9 * * *', tags = ['pipeline']) as dag:
    link_crawling = PythonOperator(
        task_id = 'CrawlingLink',
        python_callable = crawl_link,
        provide_context = True
    )

    coverletter_crawling = PythonOperator(
        task_id = 'CrawlingCoverLetter',
        python_callable = crawl_cover_letter,
        provide_context = True
    )

    link_crawling >> coverletter_crawling

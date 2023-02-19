import os
import time

from selenium import webdriver
from selenium.webdriver.common.by import By


def count_pages(driver:webdriver.Chrome) -> int:
    cnt = 1
    driver.get("https://www.jobkorea.co.kr/starter/passassay?schTxt=&Page=1")
    driver.find_element(By.XPATH, "/html/body/div[6]/div/button").click()
    while True:
        print(cnt)
        driver.implicitly_wait(5)
        driver.get("https://www.jobkorea.co.kr/starter/PassAssay?schCType=13&schGroup=&isFilterChecked=1&Page=" + str(cnt))
        driver.implicitly_wait(5)
        pages = driver.find_element(By.XPATH, "/html/body/div[@id='wrap']/div[@id='container']/div[@class='stContainer']/div[@class='starListsWrap ctTarget']/div[@class='tplPagination']")
        driver.implicitly_wait(5)

        if len(pages.find_elements(By.TAG_NAME, 'p')) == 2:
            cnt += 10
            continue
        elif cnt <= 10:
            cnt += 10
            continue
        else:
            print("check")
            print(pages.find_elements(By.TAG_NAME, 'ul'))
            cnt += len(pages.find_elements(By.TAG_NAME, 'li'))
            break
    return cnt


def link_crawl(driver:webdriver.Chrome):
    result = []
    page_count = count_pages(driver)
    print(f"[CHECK PAGE COUNT]: {page_count - 1}")

    for page_num in range(1, page_count):
        driver.get("https://www.jobkorea.co.kr/starter/PassAssay?schCType=13&schGroup=&isFilterChecked=1&Page=" + str(page_num))
        paper_list = driver.find_element(By.XPATH, "/html/body/div[@id='wrap']/div[@id='container']/div[@class='stContainer']/div[@class='starListsWrap ctTarget']/ul")
        print(paper_list)
        driver.implicitly_wait(3)
        urls = paper_list.find_elements(By.TAG_NAME, 'a')
        for url in urls:
            if 'selfintroduction' in url.get_attribute('href'):
                pass
            else:
                result.append(url.get_attribute('href'))
    
    result = list(set(result))
    for i in range(len(result)):
        result[i] = result[i].split("?")[0]

    return result


def login_protocol(driver:webdriver.Chrome): # 로그인해야지 로그인창때문에 크롤링 멈추는거 막을 수 있음
    driver.get("https://www.jobkorea.co.kr/")
    driver.find_element(By.XPATH,"/html/body/div[5]/div/div[1]/div[1]/ul/li[1]/button").click()
    driver.find_element(By.ID,"lb_id").send_keys("id")
    driver.find_element(By.ID,"lb_pw").send_keys("password")
    driver.find_element(By.XPATH,"/html/body/div[5]/div/div[1]/div[1]/ul/li[1]/div/form/fieldset/div[1]/button").click()
    driver.implicitly_wait(3)

    print("login success")


def self_introduction_crawl(driver:webdriver.Chrome, file_url, file):
    try:
        driver.get(file_url)
        user_info = driver.find_element(By.XPATH,'//*[@id="container"]/div[2]/div[1]/div[1]/h2')
        company = user_info.find_element(By.TAG_NAME,'a')

        season= user_info.find_element(By.TAG_NAME,'em')

        specification=driver.find_element(By.CLASS_NAME,'specLists')
        spec_array = specification.text.split('\n')

        advice = driver.find_elements(By.CLASS_NAME, 'adviceTotal')
        advice_check = False

        if advice:
            advice_score = int(advice[0].find_element(By.CLASS_NAME, "grade").text)
            advice_check = True

        paper = driver.find_element(By.CLASS_NAME,"qnaLists")
        questions = paper.find_elements(By.TAG_NAME,'dt')
        questions_list = []
        for index in questions:
            question = index.find_element(By.CLASS_NAME,'tx')
            if question.text=="":
                index.find_element(By.TAG_NAME,'button').click()
                question = index.find_element(By.CLASS_NAME,'tx')
            questions_list.append(question)



        answers = paper.find_elements(By.TAG_NAME,'dd')
        driver.implicitly_wait(3)
        print(f"[URL]: {file_url}")
        print(f"[COMPANY]: {company.text}")
        print(f"[SEASON]: {season.text}")
        print(f"[SPEC]: {spec_array}")
        print(f"[VIEW]: {spec_array[-2].replace(',', '')}")
        if advice_check:
            print(f"[ADVICE_SCORE]: {advice_score}")
        

        file.write(f"<<start>>\n")
        file.write(f"<url>{file_url}</url>\n")
        file.write(f"<company>{company.text}</company>\n")
        file.write(f"<season>{season.text}</season>\n")
        file.write(f"<spec>{spec_array}</spec>\n")
        file.write(f"<view>{spec_array[-2].replace(',', '')}</view>\n")
        if advice_check:
            file.write(f"<advice_score>{advice_score}</advice_score>\n")

        for index in range(len(answers)):
            answer =answers[index].find_element(By.CLASS_NAME,'tx')
            if answer.text == "":
                questions[index].find_element(By.TAG_NAME,'button').click()
                answer = answers[index].find_element(By.CLASS_NAME,'tx')
            print(f"[QUESTION - {index + 1}]: {questions_list[index].text}")
            print(f"[ANSWER - {index + 1}]: {answer.text}\n")

            bad = answers[index].find_elements(By.CLASS_NAME, "bad")
            good = answers[index].find_elements(By.CLASS_NAME, "good")
            print("BAD:",len(bad)//2)
            print("GOOD:",len(good)//2)
            
            file.write(f"<tag_q>{questions_list[index].text}</tag_q>\n")
            file.write(f"<tag_a>{answer.text}</tag_a>\n")
            file.write(f"<tag_bad>{len(bad)//2}</tag_bad>\n")
            file.write(f"<tag_good>{len(good)//2}</tag_good>\n")
        print("-" * 250)
        print('\n\n\n')
        
        file.write(f"<<end>>\n")
    
    except Exception as e:
        print("current URL : ", file_url)
        print(f"[ERROR OCCUR URL]: str{e}")
        print("\n\n")

    return file
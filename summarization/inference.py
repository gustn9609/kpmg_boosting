from transformers import pipeline, BartForConditionalGeneration, AutoTokenizer
class GeneratorParameters:
    num_return_seqs: int = 16
    num_beam_groups: int = 16
    num_beams: int = 16
    max_length: int=50
    no_repeat_ngram_n: int = 3
    diversity_penalty: float = 2.
    length_penalty: float = 2. 
    early_stopping : bool = True


input_text = '''
저는 대학시절부터 봉사활동, 학생회 활동을 통하여 사업을 기획하고 추진하며 다른 동료와 후 배들과 팀웍을 이루는데 소질이 있습니다. 매사에 적극적이며 추진력이 있다는 말을 않이 들 었습니다.

웹 기획에 관심을 가지고 수많은 사이트의 웹서핑, 좋은 사이트 분석을 통하여 사용자 중심의 구성과 서비스가 무엇인지, 그들이 지향하는 커뮤니티 방식이 무엇인지 할 수 있었습니다.학원에서 6개월 동안 웹기획에 필요한 툴을 배우고, 레이블링이나 카피를 쓰는 경험을 쌓기 위하여 카피라이터 일도 해보았습니다. 또한 방송국에서 구성작가로 일하면서 대중적인 글쓰기 방식과 사람들에게 감동을 줄 수 있 는 컨텐츠 구성방식을 터득할 수 있었습니다.

제가 지금까지 몸담고 있는 회사에서는 사이트 기획뿐만 아니라 컨텐츠 제작, 커유니티를 직접 운영하는 일을 도알아 했습니다. 외국 사이트와의 제휴업무를 통하여 영어 실력을 계속 유지 할 수 있었으며 이로 인하여 외국사이트를 서핑하고 분석해 내는데 도움을 많이 받았습니다. 이런 여러 경험을 통하여 웹 기획에 필요한 사용자 중심의 네비게이션, 카피, 서비스, 이벤트 를 기획하는 능력을 키움 수 있었습니다.

또한 저희 사이트를 영어나 일어로 번역하는데 자신 있습니다. 미국의 베르사체 대학의 홈페 이지 제작에도 참여한 바 있습니다. 지금은 전자상거래 자격증을 준비중에 있습니다.이제 웨기획은 인터넷이 갖는 특수한 조건과 환경, 사용자들의 욕구를 제대로 파악하지 않고 도 성공적인 사이트를 만드는데 기여할 수 없습니다.
사이버 공간에서만 갖는 사용자의 특성 속에서 그들이 원하는 컨텐츠와 커유니티를 만들고 이 를 기반으로 로열티가 높은 회원들을 중심으로 서로에게 이익을 줄 수 있는 사업을 만들어야 합니다. 커유니티란 본질적으로 네트워의 성격을 지닐 수밖에 없습니다.
다한 웹사이트가 전개하는 비즈니스의 필요성에 의하여 웹사이트 내에서 운영되는 커뮤니티 를 만들고 발전시킬 뿐이지, 기업에 따라서는 커뮤니티란 인터넷에 존재하는 수많은 사람들 의 모임체일 뿐이라고 생각합니다.
'''
def get_paragraph(input_text):
    # input_text = input_text.replace('\n', '')            #문단 구분 없는 버젼 레츠기릭
    processed_text = input_text.split('\n')
    processed_text = [i for i in processed_text if i != '']
    if len(processed_text) == 1:        # 문단 별로 나누었을 때 문단이 없는 경우
        tmp = processed_text.split('.') # len : 100
        total_len = len(tmp)//5 # 총 문단 수  # len : 20
        processed_text = [''.join(tmp[5*i:5*(i+1)])for i in range(total_len)]
    return processed_text
# generator = pipeline(model='roykim/Summarization')

def generate_model(input):
    model, tokenizer  = BartForConditionalGeneration.from_pretrained('roykim/Summarization'), AutoTokenizer.from_pretrained('roykim/Summarization')
    default_parameters = GeneratorParameters()
    inputs = get_paragraph(input)
    output = ''
    for text in inputs:
        text_token = tokenizer(text, padding="max_length", max_length=512, truncation=True, return_tensors="pt")
        candidates_input_ids = model.generate(
                input_ids=text_token["input_ids"], attention_mask=text_token["attention_mask"],
                num_beams=default_parameters.num_beams,
                # BeamSearchScorer = default_parameters.max_length,
                num_beam_groups=default_parameters.num_beams,
                length_penalty=default_parameters.length_penalty,
                no_repeat_ngram_size=default_parameters.no_repeat_ngram_n,
                num_return_sequences=1,
                diversity_penalty=default_parameters.diversity_penalty,
                early_stopping = default_parameters.early_stopping
            )
        candidate = tokenizer.batch_decode(candidates_input_ids, skip_special_tokens=True)
        # title
        if candidate[-1] == '.':
            output += '['+candidate[0] +']'+'\n'
        else:
            output += '['+candidate[0] + '...'+']'+'\n'
        # 원문
        output += text + '\n'
    return output
# output = generate_model(model, tokenizer, input_text)
output = generate_model(input_text)
print(output)

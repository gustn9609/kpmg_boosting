from arguments import args, train_args
from model import load_model_tokenizer
# from logger import set_logging
import nltk

# logger = set_logging('train')
model, tokenizer = load_model_tokenizer()

# Temporarily set max_target_length for training.
max_target_length = args.max_target_length
padding = "max_length" if args.pad_to_max_length else False

# if train_args.args.label_smoothing_factor > 0 and not hasattr(model, "prepare_decoder_input_ids_from_labels"):
#     logger.warning(
#         "label_smoothing is enabled but the `prepare_decoder_input_ids_from_labels` method is not defined for"
#     )

# bos = tokenizer.bos_token
# eos = tokenizer.eos_token

# remove pairs where at least one record is None
def preprocess_function(examples):
    
    # input은 </s> token으로 연결
    inputs = ['summarize: ' + inp for inp in examples['dialogue']]
    # targets = ['summarize_summary: ' + inp for inp in targets]

    
    model_inputs = tokenizer(inputs, max_length=1024, truncation=True)
    # Tokenize targets with the `text_target` keyword argument
    labels = tokenizer(text_target=examples['summary'], max_length=128, truncation=True)

    # If we are padding here, replace all tokenizer.pad_token_id in the labels by -100 when we want to ignore
    # padding in the loss.
    # if padding == "max_length":
    # labels["input_ids"] = [
    #     [(l if l != tokenizer.pad_token_id else -100) for l in label] for label in labels["input_ids"]
    # ]

    model_inputs["labels"] = labels["input_ids"]
    return model_inputs


def postprocess_text(preds, labels):
    preds = [pred.strip() for pred in preds]
    labels = [label.strip() for label in labels]

    # rougeLSum expects newline after each sentence
    preds = ["\n".join(nltk.sent_tokenize(pred)) for pred in preds]
    labels = ["\n".join(nltk.sent_tokenize(label)) for label in labels]

    return preds, labels
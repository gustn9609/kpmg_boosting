from transformers import (
    AutoConfig,
    BartForConditionalGeneration, T5Tokenizer,
    AutoTokenizer,
    PreTrainedTokenizerFast, T5ForConditionalGeneration
)
from arguments import cfg, args

def load_model_tokenizer():
    # load config, tokenizer, model
    config = AutoConfig.from_pretrained(cfg.model.model_name_or_path, cache_dir=args.cache_dir)
    tokenizer = PreTrainedTokenizerFast.from_pretrained(cfg.model.model_name_or_path, use_fast=True, cache_dir=args.cache_dir)
    model = BartForConditionalGeneration.from_pretrained(cfg.model.model_name_or_path, config=config, cache_dir=args.cache_dir)
    # tokenizer = T5Tokenizer.from_pretrained(cfg.model.model_name_or_path, use_fast=True, cache_dir=args.cache_dir)
    # model = T5ForConditionalGeneration.from_pretrained(cfg.model.model_name_or_path, config=config, cache_dir=args.cache_dir)
    
    return model, tokenizer
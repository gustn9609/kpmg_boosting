python train.py \
--output_dir /opt/ml/boosting/sentiment/test \
--overwrite_output_dir=True \
--fp16 \
--train_data '/opt/ml/boosting/sentiment/sentidata/train.csv' \
--eval_data '/opt/ml/boosting/sentiment/sentidata/test.csv' \
--model_name_or_path klue/roberta-large \
--per_device_train_batch_size 32 \
--per_device_eval_batch_size 32 \
--gradient_accumulation_steps 4 \
--num_train_epochs 20 \
--weight_decay 0.01 \
--warmup_ratio 0.1 \
--learning_rate 1e-5 \
--eval_steps 100 \
--logging_steps 100 \
--save_steps=1000 \
--load_best_model_at_end \
--evaluation_strategy steps \
--wandb_entity gustn9609 \
--wandb_project gustn9609 \
--wandb_name label_change \
--push_to_hub False \
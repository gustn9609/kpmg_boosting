import argparse


def get_parser():
    parser = argparse.ArgumentParser()

    ### Data ###

    parser.add_argument("-d", "--data-path", dest="data_path", action="store", type=str)

    ### Models ###

    parser.add_argument("-mo", "--model-name-or-path", dest="model_name_or_path", action="store", type=str)
    parser.add_argument("-to", "--tokenizer-name-or-path", dest="tokenizer_name_or_path", action="store", type=str)
    parser.add_argument("-de", "--device", dest="device", action="store", default="cuda", type=str)
    
    # Hyperparameters
    parser.add_argument("-lr", "--learning-rate", dest="learning_rate", action="store", default=5e-05, type=float)
    parser.add_argument("-b", "--batch-size", dest="batch_size", action="store", default=8, type=int)
    parser.add_argument("-e", "--num-epochs", dest="num_epochs", action="store", default=3., type=float)
    parser.add_argument("-ls", "--logging-steps", dest="logging_steps", action="store", default=100, type=int)
    parser.add_argument("-es", "--eval-steps", dest="eval_steps", action="store", default=1000, type=int)
    
    # Saving
    parser.add_argument("-sl", "--save-total-limit", dest="save_total_limit", action="store", default=3, type=bool)
    parser.add_argument("-od", "--output-dir", dest="output_dir", action="store", default="./model", type=str)
    parser.add_argument("-ss", "--save-steps", dest="save_steps", action="store", default=500, type=int)

    ### Weights & Biases ###

    parser.add_argument("-wp", "--wandb-project", dest="wandb_project", action="store", type=str)
    parser.add_argument("-we", "--wandb-entity", dest="wandb_entity", action="store", type=str)
    parser.add_argument("-wn", "--wandb-name", dest="wandb_name", action="store", type=str)
    parser.add_argument("-wg", "--wandb-group", dest="wandb_group", action="store", type=str)

    return parser

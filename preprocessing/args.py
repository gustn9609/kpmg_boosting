import argparse


def get_parser():
    parser = argparse.ArgumentParser()

    parser.add_argument("-j", "--json-path", dest="json_path", action="store", default="./data/data.json", type=str)
    parser.add_argument("-s", "--save-dir", dest="save_dir", action="store", default="./data/preprocessed_data", type=str)

    return parser

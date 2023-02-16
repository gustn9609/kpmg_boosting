import argparse


def get_parser():
    parser = argparse.ArgumentParser()

    parser.add_argument("-s", "--save-dir", dest="save_dir", action="store", type=str)
    parser.add_argument("-c", "--chromedriver", dest="chromedriver", action="store", type=str)
    parser.add_argument("-i", "--jobkorea-id", dest="jobkorea_id", action="store", default="", type=str)
    parser.add_argument("-p", "--jobkorea-password", dest="jobkorea_password", action="store", default="", type=str)

    return parser

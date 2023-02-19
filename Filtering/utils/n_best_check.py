import json
from datasets import load_from_disk

n_best_path = "/opt/ml/results/n_best_prediction-1.json"
data = load_from_disk("/opt/ml/input/data/train_dataset")["validation"]

with open(n_best_path, "r") as file:
    n_best_file = json.load(file)

store = []
for i in range(len(data)):
    id = data[i]["id"]
    answer = data[i]["answers"]["text"][0]
    
    n_best = eval(n_best_file[id])
    
    if answer in n_best:
        pass
    else: store.append(i)

print(len(store))
print(store)

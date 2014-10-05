import json
import csv

def edges():
    with open('cooperation-Edges.csv', 'rb') as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',', quotechar='"')
        # each entry is (Src, Tgt, Weight)
        edge_list = [tuple(line) for line in csvreader]
    with open('cooperation-edges.json', 'w') as fout:
        fout.write(json.dumps(edge_list, encoding='latin-1'))

def nodes():
    with open('cooperation-Nodes.csv', 'rb') as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',', quotechar='"')
        # each entry is Id -> (City, lat, lon, modularity class, pageRank)
        city_to_data = {line[0] : tuple(line[1:]) for line in csvreader}
    with open('cooperation-nodes.json', 'w') as fout:
        fout.write(json.dumps(city_to_data, encoding='latin-1'))

if __name__ == '__main__':
    nodes()
    edges()


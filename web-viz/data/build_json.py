import json
import csv


if __name__ == '__main__':
    with open('cooperation-Nodes.csv', 'rb') as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',', quotechar='"')
        # each entry is Id -> (City, lat, lon, modularity class, pageRank)
        city_to_data = {line[0] : line[1:] for line in csvreader}
    with open('cooperation-Edges.csv', 'rb') as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',', quotechar='"')
        # each entry is (Src lat, src lon, Tgt lat, tgt lon, Weight)
        edge_list = [line for line in csvreader]
    with open('cooperation-edges.json', 'w') as fout:
        fout.write(json.dumps(edge_list, encoding='latin-1'))
    with open('cooperation-nodes.json', 'w') as fout:
        fout.write(json.dumps(city_to_data, encoding='latin-1'))


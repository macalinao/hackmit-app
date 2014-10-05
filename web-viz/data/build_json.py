import json
import csv


if __name__ == '__main__':
    with open('cooperation-Nodes.csv', 'rb') as csvfile:
        with open('conflict-Nodes.csv', 'rb') as csvfile2:
            csvreader = csv.reader(csvfile, delimiter=',', quotechar='"')
            csvreader2 = csv.reader(csvfile2, delimiter=',', quotechar='"')
            # each entry is Id -> (City, lat, lon, modularity class, pageRank)
            city_to_data = {line[0] : line[1:] for line in csvreader}
            city_to_data.update({line[0] : line[1:] for line in csvreader2})
    with open('cooperation-Edges.csv', 'rb') as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',', quotechar='"')
        # each entry is (Src lat, src lon, Tgt lat, tgt lon, Weight)
        coop_edge_list = [line for line in csvreader]
    with open('conflict-Edges.csv', 'rb') as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',', quotechar='"')
        confl_edge_list = [line for line in csvreader]
    with open('cooperation-edges.json', 'w') as fout:
        fout.write(json.dumps(coop_edge_list, encoding='latin-1'))
    with open('conflict-edges.json', 'w') as fout:
        fout.write(json.dumps(confl_edge_list, encoding='latin-1'))
    with open('nodes.json', 'w') as fout:
        fout.write(json.dumps(city_to_data, encoding='latin-1'))


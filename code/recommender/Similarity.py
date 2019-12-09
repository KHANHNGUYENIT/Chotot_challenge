from config import *
import pandas as pd
import math


class Similarity:
    def __init__(self, similarity_df=''):
        if similarity_df != '':
            self.similarity = pd.read_pickle(similarity_df)
        else:
            self.similarity = {}

    def item_mean_sim(self, item_id):
        sum_sim = 0
        num = 0
        for paired_item_id, value in self.similarity.get(item_id).items():
            # print(paired_item_id)
            sum_sim += value['sim']
            num += 1
        return sum_sim/num

    def get_n_update(self, citem_id, titem_id):
        return self.similarity.get(citem_id).get(titem_id).get('n_updates')

    def create_new(self, item_id):
        self.similarity[item_id] = {}

    def create_pair(self, citem_id, titem_id):
        self.similarity[citem_id][titem_id] = {'sim': 0, 'n_updates': 0}

    def similarity_computing(sefl, corating, pcount, qcount, delta_corating=0, delta_pcount=0, delta_qcount=0):
        # return (corating + delta_corating) / (math.sqrt(pcount + delta_pcount) * math.sqrt(qcount + delta_qcount))
        return (corating) / (math.sqrt(pcount*qcount ))

    def update(self, sim_score, citem_id, titem_id):
        #For current item
        self.similarity[citem_id][titem_id]['sim'] = sim_score
        self.similarity[citem_id][titem_id]['n_updates'] += 1
        #For target item
        self.similarity[titem_id][citem_id]['sim'] = sim_score
        self.similarity[titem_id][citem_id]['n_updates'] += 1
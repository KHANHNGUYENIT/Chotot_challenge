from config import *
import pandas as pd


class PairCount:
    def __init__(self, count_pair_df=''):

        if count_pair_df != '':
            self.pair_count = pd.read_pickle(count_pair_df)
        else:
            self.pair_count = {}

    def update_corating(self, citem_id, titem_id, co_user, ncorating):
        pcorating = self.pair_count[citem_id][titem_id].get(co_user)  # Previous co-rating weight
        delta_corating = ncorating - pcorating

        if delta_corating > 0:
            self.pair_count[citem_id][titem_id]['total'] += delta_corating
            self.pair_count[citem_id][titem_id][co_user] = ncorating
            self.pair_count[titem_id][citem_id]['total'] += delta_corating
            self.pair_count[titem_id][citem_id][co_user] = ncorating

        return delta_corating > 0, delta_corating

    def update_new_corating(self, citem_id, titem_id, nco_user, ncorating):
        self.pair_count[citem_id][titem_id]['total'] += ncorating
        self.pair_count[citem_id][titem_id][nco_user] = ncorating

    def create_pair(self, citem_id, titem_id, nco_user, ncorating):
        self.pair_count[citem_id][titem_id] = {'total': ncorating}
        self.pair_count[citem_id][titem_id][nco_user] = ncorating

    def create_new(self, item_id):
        self.pair_count[item_id] = {}

    def get_pair(self, citem_id, titem_id):
        return self.pair_count[citem_id].get(titem_id)

    def get_item(self, item_id):
        return self.pair_count.get(item_id)

    def get_co_user(self, citem_id, titem_i, co_user):
        return self.pair_count[citem_id][titem_i].get(co_user)


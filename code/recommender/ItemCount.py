from config import *
import pandas as pd


class ItemCount:
    def __init__(self, item_counter_dict=''):

        if item_counter_dict != '':
            self.item_count = pd.read_pickle(item_counter_dict)
        else:
            self.item_count = {}

    def update(self, item_id , nweight, user_fingerprint):
        try:
            oweight = self.get_rating(item_id, user_fingerprint)
            delta = self.delta_weight(oweight, nweight)
            if delta > 0:
                self.item_count[item_id][user_fingerprint] += delta
                self.item_count[item_id]['total'] += delta
            return delta>0

        except:
            print("Item has not been rated yet!")
            self.item_count[item_id][user_fingerprint] = nweight
            try:
                self.item_count[item_id]['total'] += nweight
            except:
                self.item_count[item_id]['total'] = nweight
            return True

    def count(self, item_id):
        try:
            item_dict = self.get_item(item_id)
            return item_dict['total']
        except:
            print("Item have not been added yet!")
            return 0

    def get_item(self, item_id):
        try:
            return self.item_count[item_id]
        except:
            print("Item have not been added yet!")
            self.item_count[item_id] = {}
            return self.item_count[item_id]

    def get_rating(self, item_id, user_fingerprint):
        item_dict = self.get_item(item_id)
        return item_dict.get(user_fingerprint) if item_dict.get(user_fingerprint) else 0
        # try:
        #     return item_dict[user_fingerprint]
        # except:
        #     print("User have not rated this item!")
        #     return 0

    def delta_weight(self, oweight, nweight):
        return nweight - oweight

    def get_dict(self):
        return self.item_count
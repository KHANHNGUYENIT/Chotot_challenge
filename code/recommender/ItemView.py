from config import *
import pandas as pd


class ItemView:
    def __init__(self, item_view_dict=''):
        if item_view_dict != '':
            self.item_view = pd.read_pickle(item_view_dict)
            self.item_set = set(self.item_view.items())
        else:
            self.item_view = {}
            self.item_set = set([])

    def update(self, item_id, user_fingerprint, timestamp):
        item_dict = self.get_item(item_id)
        item_dict['item_view'].append([user_fingerprint, timestamp])
        item_dict['views'].add(item_id)
        item_dict['users'].add(user_fingerprint)

    def get_item(self, item_id):
        if item_id in self.item_set:
            return self.item_view[item_id]
        else:
            print("Item has not been added yet!")
            self.item_set.add(item_id)
            self.item_view[item_id] = {}
            self.item_view[item_id]['item_view'] = []
            self.item_view[item_id]['views'] = set([])
            self.item_view[item_id]['users'] = set([])
            return self.item_view[item_id]

    def item_checking(self, item_id):
        return item_id in self.item_set

    def user_checking(self, item_id):
        return self.item_view[item_id]['users']

    def get_views(self, item_dict, item_id):
        try:
            return item_dict[item_id]
        except:
            print("User have not rated this item!")
            return 0

    def get_dict(self):
        return self.item_view
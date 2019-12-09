from config import *
import pandas as pd


class UserView:
    def __init__(self, user_view_dict=''):
        if user_view_dict != '':
            self.user_view = pd.read_pickle(user_view_dict)
            self.user_set = set(self.user_view.items())
        else:
            self.user_view = {}
            self.user_set = set([])

    def update(self, user_fingerprint, item_id, timestamp):
        user_dict = self.get_user(user_fingerprint)
        user_dict['user_view'].append([item_id, timestamp])
        user_dict['views'].add(item_id)
        # user_dict['items'].add(item_id)

    def get_user(self, user_fingerprint):
        if user_fingerprint in self.user_set:
            return self.user_view[user_fingerprint]
        else:
            print("User has not been added yet!")
            self.user_set.add(user_fingerprint)
            self.user_view[user_fingerprint] = {}
            self.user_view[user_fingerprint]['user_view'] = []
            self.user_view[user_fingerprint]['views'] = set([])
            # self.user_view[user_fingerprint]['items'] = set([])
            return self.user_view[user_fingerprint]

    def user_checking(self, user_fingerprint):
        return user_fingerprint in self.user_set

    def item_checking(self, user_fingerprint):
        return self.user_view[user_fingerprint]['views']

    def get_views(self, user_dict, user_fingerprint):
        try:
            return user_dict[user_fingerprint]
        except:
            print("User have not rated this item!")
            return 0

    def get_dict(self):
        return self.user_view

    def is_existed_user(self, user_id):
        return user_id in self.user_set

    def is_seen_item(self, user_id, item_id):
        return item_id in self.user_view[user_id]['views']

    def recent_view(self, user_id, num=10):
        return self.user_view[user_id]['user_view'][-num:]
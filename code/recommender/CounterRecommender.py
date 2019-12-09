from config import *
from ItemCount import ItemCount
from UserView import UserView
from ItemView import ItemView
from PairCount import PairCount
from Similarity import Similarity
import pandas as pd
import numpy as np
import pickle
import math
import os


class CounterRecommender:
    def __init__(self, restore= False, status_folder=''):

        #User behaviour
        self.user_view = UserView()
        #Item history
        # self.item_view = ItemView()
        #Item counting
        self.item_count = ItemCount()
        self.pair_count = PairCount()
        self.similarity = Similarity()
        self.prunning_list = {}
        self.N_items = {}

        if restore:
            self.status_restoring(status_folder)

    def track_event(self, event, id=None):
        # print(id)
        #Input information
        item_id = event['ad_id']
        user_fingerprint = event['user_fingerprint']
        event_name = event['event_name']
        timestamp = event['timestamp']
        nweight = EVENT_WEIGHTS[event_name.upper()]

        #Layer 1
        self.user_view.update(user_fingerprint, item_id, timestamp)
        # self.item_view.update(item_id, user_fingerprint, timestamp)

        #Layer 2
        #Layer 2-1: Item count
        counpair_update_flag = self.item_count.update(item_id, nweight, user_fingerprint)
        #If there is no change in ItemCount, so there is no change in the other parts too
        if not counpair_update_flag:
            return

        #Layer 2-2: Pair count

        if self.prunning_list.get(item_id) == None:
            #Create new prunning list
            self.prunning_list[item_id] = set([])

        if self.pair_count.get_item(item_id) == None:
            # Create empty.
            self.pair_count.create_new(item_id)
            self.similarity.create_new(item_id)

        pweight = self.item_count.get_rating(item_id, user_fingerprint) #previous weight of current item
        cweight = max(pweight, nweight) #Choosing max weight for the last event
        # List all items rated by current user
        rated_item_id_list = [rated_item_id for rated_item_id in self.user_view.item_checking(user_fingerprint) if rated_item_id != item_id]
        for rated_item_id in rated_item_id_list:

            #Check whether target item is in prunning list or not
            if rated_item_id in self.prunning_list[item_id]:
                #If item is in prunning list, skip it.
                continue

            if self.prunning_list.get(rated_item_id) == None:
                # Create new prunning list
                self.prunning_list[rated_item_id] = set([])

            sim_update_flag = True
            # Check existence of item in PairCount
            if self.pair_count.get_item(item_id) != None:
                tweight = self.item_count.get_rating(rated_item_id, user_fingerprint) #weight of the target
                ncorating = min(tweight, cweight) #New co-rating weight
                if self.pair_count.get_pair(item_id, rated_item_id) != None:
                    if self.pair_count.get_co_user(item_id, rated_item_id, user_fingerprint) != None:
                        #The pair is existed. Need to compare condition for updating.
                        sim_update_flag, delta_corating = self.pair_count.update_corating(item_id, rated_item_id, user_fingerprint, ncorating)
                    else:
                        #The pair is existed, without co-user
                        self.pair_count.update_new_corating(item_id, rated_item_id, user_fingerprint, ncorating)
                        self.pair_count.update_new_corating(rated_item_id, item_id, user_fingerprint, ncorating)
                else:
                    #There is no pair between two item
                    #Create main pair
                    self.similarity.create_pair(item_id, rated_item_id)
                    self.pair_count.create_pair(item_id, rated_item_id, user_fingerprint, ncorating)
                    #Create corresponding pair
                    self.similarity.create_pair(rated_item_id, item_id)
                    self.pair_count.create_pair(rated_item_id, item_id, user_fingerprint, ncorating)
            else:
                tweight = self.item_count.get_rating(rated_item_id, user_fingerprint) #weight of the target
                ncorating = min(tweight, cweight) #New co-rating weight
                #Create main pair
                self.similarity.create_pair(item_id, rated_item_id)
                self.pair_count.create_pair(item_id, rated_item_id, user_fingerprint, ncorating)
                #Check the corresponding item whether existed or not
                if self.pair_count.get_pair(rated_item_id, item_id) != None:
                    #Update new co-user
                    self.pair_count.update_new_corating(rated_item_id, item_id, user_fingerprint, ncorating)
                else:
                    #Create new corresponding pair
                    self.similarity.create_pair(rated_item_id, item_id)
                    self.pair_count.create_pair(rated_item_id, item_id, user_fingerprint, ncorating)

            #Layer 3: Similarity
            if not sim_update_flag:
                return

            ccount = self.item_count.count(item_id)
            tcount = self.item_count.count(rated_item_id)
            corating = self.pair_count.pair_count[item_id][rated_item_id]['total']
            sim = self.similarity.similarity_computing(corating, ccount, tcount)
            self.similarity.update(sim, item_id, rated_item_id)
            t1 = self.similarity.item_mean_sim(item_id)
            t2 = self.similarity.item_mean_sim(rated_item_id)
            t = min(t1, t2)
            n = self.similarity.get_n_update(item_id, rated_item_id)
            epsilon = self.epsilon(n)
            if epsilon < t - sim:
                self.prunning_list[item_id].add(rated_item_id)
                self.prunning_list[rated_item_id].add(item_id)

        sorted_list = sorted(self.similarity.similarity[item_id].items(), key=lambda kv: (kv[1]['sim'], kv[0]), reverse=True)
        if len(sorted_list)>10:
            sorted_list = sorted_list[0:10]
        self.N_items[item_id] = sorted_list


    def epsilon(self, n, alpha=0.05, R=1):
        return math.sqrt(((R**2)*math.log(1/alpha))/(2*n))

    def recommend(self, user_id):

        if not self.user_view.is_existed_user(user_id):
            return []

        reccent_viewed_items = self.user_view.recent_view(user_id, 10)
        reccent_viewed_item_with_rating = [[item_id, self.item_count.get_rating(item_id, user_id)] for item_id, timestamp in reccent_viewed_items]

        def takeSecond(elem):
            return elem[1]

        reccent_viewed_item_with_rating.sort(key=takeSecond, reverse=True)

        unseen_items_dict = {}
        unseen_items_list = []
        for recent_viewed_item, rating in reccent_viewed_item_with_rating[:10]:
            similar_items = self.N_items.get(recent_viewed_item)
            # sims = [value[1]['sim'] for value in similar_items]
            # sum_sims = np.sum(sims)
            # user_rating = self.item_count.get_rating(recent_viewed_item, user_id)
            # for similar_item_id, value in similar_items:
            #     if self.user_view.is_seen_item(user_id, similar_item_id) or (similar_item_id in unseen_items):
            #         continue
            #     unseen_items.append(similar_item_id)
            temp_unseen_items = [similar_item_id for similar_item_id, value in similar_items
                                 if not (self.user_view.is_seen_item(user_id, similar_item_id) or (similar_item_id in unseen_items_list))]
            unseen_items_dict.update({recent_viewed_item: temp_unseen_items})
            unseen_items_list += temp_unseen_items

        recommend_items = []
        for key in unseen_items_dict:
            unseen_items = unseen_items_dict[key]
            defaut_rating = self.item_count.get_rating(key, user_id)
            for unseen_item in unseen_items:
                defaut_sim = self.similarity.similarity[key][unseen_item]
                # defaut_sim = {'sim': 0}
                similar_items = self.N_items.get(unseen_item)
                ratings = [self.item_count.get_rating(value[0], user_id) for value in similar_items]
                r = [1  if self.item_count.get_rating(value[0], user_id) else 0 for value in similar_items]
                sims = [value[1]['sim'] for value in similar_items]
                sum_sims = np.sum(np.dot(r, sims))
                if sum_sims==0:
                    predicted_rating = defaut_rating*min(defaut_sim['sim'], 0.6)
                    # predicted_rating = 0
                else:
                    predicted_rating = np.dot(ratings, sims) / sum_sims
                recommend_items.append((unseen_item, predicted_rating))

        # recommend_items = sorted(recommend_items, key=lambda x: x[1], reverse=True)
        recommend_items.sort(key=takeSecond, reverse=True)
        # print(recommend_items)
        return recommend_items

    def status_restoring(self, folder):
        pickle_files = [os.path.join(folder, file) for file in os.listdir(folder)]
        for file in pickle_files:
            if 'itemcount' in file:
                print('Restoring ItemCount...!')
                self.item_count = pickle.load(open(file, 'rb'))
                print('Done')
            if 'userview' in file:
                print('Restoring Userview...')
                self.user_view = pickle.load(open(file, 'rb'))
                print('Done')
            if 'paircount' in file:
                print('Restoring PairCount...')
                self.pair_count = pickle.load(open(file, 'rb'))
                print('Done')
            if 'similarity' in file:
                print('Restoring Similarity...')
                self.similarity = pickle.load(open(file, 'rb'))
                print('Done')
            if 'prunninglist' in file:
                print('Restoring PrunningList...')
                self.prunning_list = pickle.load(open(file, 'rb'))
                print('Done')
            if 'nitems' in file:
                print('Restoring NItems...')
                self.N_items = pickle.load(open(file, 'rb'))
                print('Done')

    def status_saving(self):
        print('Start saving status...')

        with open('itemcount.pkl', 'wb') as file:
            pickle.dump(self.item_count, file)
        print('ItemCount done!')

        with open('userview.pkl', 'wb') as file:
            pickle.dump(self.user_view, file)
        print('UserView done!')

        with open('paircount.pkl', 'wb') as file:
            pickle.dump(self.pair_count, file)
        print('PairCount done!')

        with open('similarity.pkl', 'wb') as file:
            pickle.dump(self.similarity, file)
        print('Similarity done!')

        with open('prunninglist.pkl', 'wb') as file:
            pickle.dump(self.prunning_list, file)
        print('PrunningList done!')

        with open('nitems.pkl', 'wb') as file:
            pickle.dump(self.N_items, file)
        print('NItems done!')
        print('...Done!')

    def get_item_count_dict(self):
        return self.item_count

    def get_user_view_dict(self):
        return self.user_view



        #Check existence of item in PairCount
        # if self.pair_count.get_item(item_id) != None:
        #     #List all items rated by current user
        #     rated_item_id_list = [rated_item_id for rated_item_id in self.user_view.item_checking(user_fingerprint) if rated_item_id != item_id]
        #     for rated_item_id in rated_item_id_list:
        #         tweight = self.item_count.get_rating(rated_item_id, user_fingerprint) #weight of the target
        #         ncorating = min(tweight, cweight) #New co-rating weight
        #         if self.pair_count.get_pair(item_id, rated_item_id) != None:
        #             if self.pair_count.get_co_user(item_id, rated_item_id, user_fingerprint) != None:
        #                 #The pair is existed. Need to compare condition for updating.
        #                 sim_update_flag, delta_corating = self.pair_count.update_corating(item_id, rated_item_id, user_fingerprint, ncorating)
        #             else:
        #                 #The pair is existed, without co-user
        #                 self.pair_count.update_new_corating(item_id, rated_item_id, user_fingerprint, ncorating)
        #                 self.pair_count.update_new_corating(rated_item_id, item_id, user_fingerprint, ncorating)
        #         else:
        #             #There is no pair between two item
        #             #Create main pair
        #             self.similarity.create_pair(item_id, rated_item_id)
        #             self.pair_count.create_pair(item_id, rated_item_id, user_fingerprint, ncorating)
        #             #Create corresponding pair
        #             self.similarity.create_pair(rated_item_id, item_id)
        #             self.pair_count.create_pair(rated_item_id, item_id, user_fingerprint, ncorating)
        # else:
        #     #Create empty.
        #     self.pair_count.create_new(item_id)
        #     self.similarity.create_new(item_id)
        #     #List all items rated by current user
        #     rated_item_id_list = [rated_item_id for rated_item_id in self.user_view.item_checking(user_fingerprint) if rated_item_id != item_id]
        #     for rated_item_id in rated_item_id_list:
        #         tweight = self.item_count.get_rating(rated_item_id, user_fingerprint) #weight of the target
        #         ncorating = min(tweight, cweight) #New co-rating weight
        #         #Create main pair
        #         self.similarity.create_pair(item_id, rated_item_id)
        #         self.pair_count.create_pair(item_id, rated_item_id, user_fingerprint, ncorating)
        #         #Check the corresponding item whether existed or not
        #         if self.pair_count.get_pair(rated_item_id, item_id) != None:
        #             #Update new co-user
        #             self.pair_count.update_new_corating(rated_item_id, item_id, user_fingerprint, ncorating)
        #         else:
        #             #Create new corresponding pair
        #             self.similarity.create_pair(rated_item_id, item_id)
        #             self.pair_count.create_pair(rated_item_id, item_id, user_fingerprint, ncorating)
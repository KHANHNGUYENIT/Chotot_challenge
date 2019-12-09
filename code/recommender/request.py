import requests

url01 = 'http://118.69.225.72:5000/recommend'
r = requests.post(url01, json={'userID': 'c00e5df1-4779-421c-875f-fd079e0399ef'})
print(r.json()) # {'results": True}
url02 = 'http://118.69.225.72:5000/event-tracking'
r = requests.post(url02,
                  json={
                      'ad_id': '612314',
                      'user_fingerprint': 'c00e5df1-4779-421c-875f-fd079e0399ef',
                      'event_name': 'ADLISTING/ADVIEW_CLICK',
                      'timestamp': 123456
                  })
print(r.json()) # {'recommended_items": [[item_id_01, rating_01], [item_id_01, rating_01],...]}
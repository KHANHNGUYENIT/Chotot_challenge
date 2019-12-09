import flask
from flask import Flask, request, jsonify, render_template
from CounterRecommender import CounterRecommender


app = Flask(__name__)
counter = CounterRecommender(restore=True, status_folder='./store_main/')

@app.route('/event-tracking', methods=['POST'])
def event_tracking():
    try:
        data = request.get_json(force=True)
        assert len(data.keys())==4
        counter.track_event(data)
        return jsonify({'results': True})
    except Exception as e:
        raise e

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.get_json(force=True)
        user_id = data['userID']
        recommended_items = counter.recommend(user_id)
        return jsonify({'recommended_items': [[str(val[0]), str(val[1])] for val in recommended_items]})
    except Exception as e:
        raise e


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)

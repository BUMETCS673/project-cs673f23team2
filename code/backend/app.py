import json
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

from firebase_admin import firestore, db
import requests
from wrapper import fetch_video_data_from_youtube
from datetime import datetime

from configs.firebase_config import setup_firebase

setup_firebase()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"})


@app.route("/writeUserToFirestore", methods=["GET"])
def writeUserToFirestore():
    db = firestore.client()
    user = request.args.get("userDetails", "")
    userDetails = json.loads(user)
    db.collection("users").document(userDetails["userId"]).set(userDetails)
    return jsonify({"status": "ok"})


@app.route("/fetchvideos", methods=["GET"])
def fetch_videos_from_youtube_api():
    # Get Arguments from the GET Request
    search_query = request.args.get("q", "Learn Flask")
    max_results = request.args.get("maxResults", 1)
    video_duration = request.args.get("videoDuration", "any")

    # Fetch Youtube Videos and return the list of videos as response
    video_results = fetch_video_data_from_youtube(
        search_query, max_results, video_duration
    )

    return jsonify(video_results)


@app.route("/addtosearchhistory", methods=["GET"])
def add_to_search_history():
    section = request.args.get("section", "")
    keyword = request.args.get("keyword", "")
    userId = request.args.get("userId", "")
    print(section, keyword, userId)

    ref = (
        db.reference("users")
        .child(userId)
        .child("keywords")
        .child(section)
        .child(keyword)
    )

    refVal = ref.get()
    if refVal == None:
        ref.child("count").set(1)
    else:
        ref.child("count").set(refVal["count"] + 1)

    return jsonify({"status": "ok"})


@app.route("/addFirstClickInfo", methods=["GET"])
def add_first_click_info():
    section = request.args.get("section", "")
    videoDuration = request.args.get("videoDuration", "")
    userId = request.args.get("userId", "")
    print(section, videoDuration, userId)

    ref = (
        db.reference("users")
        .child(userId)
        .child("firstClickInfo")
        .child(section)
        .child(videoDuration)
    )

    refVal = ref.get()
    if refVal == None:
        ref.child("count").set(1)
    else:
        ref.child("count").set(refVal["count"] + 1)

    return jsonify({"status": "ok"})


@app.route("/addwatchhistory", methods=["GET"])
def update_watch_time_to_database():
    watchtime = request.args.get("watchtime", "")
    keyword = request.args.get("keyword", "")
    userId = request.args.get("userId", "")
    section = request.args.get("section", "")
    videoDetails = request.args.get("videoDetails", "")
    videoDetailsJSON = json.loads(videoDetails)

    print(watchtime, keyword, userId, section, videoDetails)
    # Update Watch time for each keyword
    ref = (
        db.reference("users")
        .child(userId)
        .child("keywords")
        .child(section)
        .child(keyword)
    )

    refVal = ref.get()
    if refVal == None:
        ref.set({"watchTime": watchtime})
    else:
        prevWatchTime = ref.child("watchTime").get()
        if prevWatchTime == None:
            ref.child("watchTime").set(watchtime)
        else:
            ref.child("watchTime").set(watchtime + prevWatchTime)

    # Add Watch History
    today = datetime.now().date()
    formatted_date = today.strftime("%Y%m%d")

    watchHistoryRef = (
        db.reference("users")
        .child(userId)
        .child("watchHistory")
        .child(formatted_date)
        .child(section)
        .child(videoDetailsJSON["id"])
    )

    watchHistoryRef.child("videoDetails").set(videoDetailsJSON)
    prevWatchHistoryWatchTime = watchHistoryRef.child("watchTime").get()
    if prevWatchHistoryWatchTime == None:
        watchHistoryRef.child("watchTime").set(watchtime)
    else:
        watchHistoryRef.child("watchTime").set(watchtime + prevWatchHistoryWatchTime)

    return jsonify({"status": "ok"})


@app.route("/getUserHobbies", methods=["GET"])
def getUserHobbiesFromFirestore():
    db = firestore.client()
    userId = request.args.get("userId", "")
    userDoc = db.collection("users").document(userId).get()
    if userDoc.exists:
        userDetails = userDoc.to_dict()
        return jsonify({"hobbies": userDetails["hobbies"]})
    else:
        return jsonify({"hobbies": []})

@app.route("/getUserProfile", methods=["GET"])
def getUserProfileFromFirestore():
    db = firestore.client()
    print('RUNNING')
    userId = request.args.get("userId", "")
    userDoc = db.collection("users").document(userId).get()
    if userDoc.exists:
        userDetails = userDoc.to_dict()
        return jsonify({"userDetails": userDetails})
    else:
        return jsonify({"userDetails": {}})

@app.route("/reward-points", methods=["GET"])
def get_user_reward_points():
    db = firestore.client()
    userId = request.args.get("userId", "")
    userDoc = db.collection("users").document(userId).get()
    if userDoc.exists:
        userDetails = userDoc.to_dict()
        return jsonify({"rewards": userDetails["rewardPoints"]})
    else:
        return jsonify({"rewards": []})


@app.route("/getFirstClicksData", methods=["GET"])
def get_first_click_info():
    userId = request.args.get("userId", "")
    # print(userId)

    ref = db.reference("users").child(userId).child("firstClickInfo")

    refVal = ref.get()
    if refVal == None:
        pass
    else:
        # print(refVal)
        new_format = []

        for feed_name, feed_data in refVal.items():
            for duration_name, duration_data in feed_data.items():
                new_format.append(
                    {
                        "name": duration_name,
                        "count": duration_data["count"],
                        "feed": feed_name,
                    }
                )
    # print(new_format)
    return jsonify({"firstClickData": new_format})


@app.route("/getKeywordData", methods=["GET"])
def get_keyword_data():
    userId = request.args.get("userId", "")
    print(userId)

    ref = db.reference("users").child(userId).child("keywords")

    refVal = ref.get()
    if refVal == None:
        pass
    else:
        new_format = []
        for feed_name, feed_data in refVal.items():
            for duration_name, duration_data in feed_data.items():
                new_format.append(
                    {
                        "name": duration_name,
                        "count": duration_data.get("count", 0),
                        "feed": feed_name,
                    }
                )
        print(new_format)
    return jsonify({"firstClickData": new_format})


if __name__ == "__main__":
    app.run(debug=True)

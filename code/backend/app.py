import json
from flask import Flask, jsonify, request
from flask_cors import CORS

from firebase_admin import firestore, db
import requests
from wrapper import fetch_video_data_from_youtube
from datetime import datetime

from configs.firebase_config import setup_firebase

setup_firebase()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


# Health Check
@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"})


# Write to User to Firestore
@app.route("/writeUserToFirestore", methods=["GET"])
def writeUserToFirestore():
    db = firestore.client()
    user = request.args.get("userDetails", "")
    userDetails = json.loads(user)
    db.collection("users").document(userDetails["userId"]).set(userDetails)
    return jsonify({"status": "ok"})


# To Fetch Videos
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


# To add to search History
@app.route("/addtosearchhistory", methods=["GET"])
def add_to_search_history():
    section = request.args.get("section", "")
    keyword = request.args.get("keyword", "")
    userId = request.args.get("userId", "")
    print(section, keyword, userId)


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


# Check for addFirstClick
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


# Check for watch History
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


# Check for UserHobbies
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


# Check for retrieving UserProfile
@app.route("/getUserProfile", methods=["GET"])
def getUserProfileFromFirestore():
    db = firestore.client()
    print("RUNNING")
    userId = request.args.get("userId", "")
    userDoc = db.collection("users").document(userId).get()
    if userDoc.exists:
        userDetails = userDoc.to_dict()
        return jsonify({"userDetails": userDetails})
    else:
        return jsonify({"userDetails": {}})


# Check for RewardPoints
@app.route("/reward-points", methods=["GET"])
def get_user_reward_points():
    userId = request.headers.get("userId", "")
    print(userId)

    ref = db.reference("users").child(userId).child("reward-points")

    retVal = ref.get()

    if retVal == None:
        ref.set(0)
        retVal = 0

    return jsonify({"rewards": retVal})


@app.route("/write-reward-points", methods=["GET"])
def write_user_reward_points():
    print(request.headers)
    userId = request.headers.get("userId", "")
    rewards = request.headers.get("rewards", 0)

    ref = db.reference("users").child(userId).child("reward-points")

    ref.set(int(rewards))

    refval = ref.get()
    print(refval)

    return jsonify({"success": True, "status_code": 200})


# Check to see if Data is fetched on First clicks Data
@app.route("/getFirstClicksData", methods=["GET"])
def get_first_click_info():
    userId = request.args.get("userId", "")

    ref = db.reference("users").child(userId).child("firstClickInfo")

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
                        "count": duration_data["count"],
                        "feed": feed_name,
                    }
                )
    return jsonify({"firstClickData": new_format})


# Check to getKeywordData
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
    return jsonify({"firstClickData": new_format})


# Check to fetch user watch video history
@app.route("/getWatchVideoHistory", methods=["GET"])
def get_watch_video_history():
    userId = request.args.get("userId", "")

    ref = db.reference("users").child(userId).child("watchHistory")
    ref_val = ref.get()

    result_list = []
    if ref_val is None:
        return jsonify({"videoHistory": result_list})
    else:
        print(ref_val)
        # Iterate through the nested dictionary
        for date, feed_data in ref_val.items():
            for feed_type, video_data in feed_data.items():
                for video_id, video_info in video_data.items():
                    # Extract the relevant information and add it to the result list
                    extracted_info = {
                        "creator": video_info["videoDetails"]["creator"],
                        "duration": video_info["videoDetails"]["duration"],
                        "id": video_info["videoDetails"]["id"],
                        "thumbnail": video_info["videoDetails"]["thumbnail"],
                        "title": video_info["videoDetails"]["title"],
                        "url": video_info["videoDetails"]["url"],
                        "watchTime": video_info["watchTime"],
                    }
                    result_list.append(extracted_info)

                    for res in result_list:
                        print(f"res => {res}")

                    return jsonify({"videoHistory": result_list})


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
    return jsonify({"keywordData": new_format})


@app.route("/getHeatMapData", methods=["GET"])
def get_heatmap_data():
    userId = request.args.get("userId", "")
    print(userId)

    ref = db.reference("users").child(userId).child("watchHistory")

    refVal = ref.get()
    if refVal == None:
        pass
    else:
        current_date = datetime.now()
        current_year = current_date.year
        current_month = current_date.month

        # Extract the desired information
        result = []
        for date, feeds in refVal.items():
            date_object = datetime.strptime(date, "%Y%m%d")
            if date_object.year == current_year and date_object.month == current_month:
                education_feed_count = len(feeds.get("EducationFeed", {}))
                entertainment_feed_count = len(feeds.get("EntertainmentFeed", {}))

                result.append(
                    {
                        "date": date_object.day,
                        "educationFeedName": "educationFeed",
                        "entertainmentFeedName": "entertainmentFeed",
                        "educationFeedCount": education_feed_count,
                        "entertainmentFeedCount": entertainment_feed_count,
                    }
                )
            else:
                result.append(
                    {
                        "date": date_object.day,
                        "educationFeedName": "educationFeed",
                        "entertainmentFeedName": "entertainmentFeed",
                        "educationFeedCount": 0,
                        "entertainmentFeedCount": 0,
                    }
                )

        for i in range(1, 33):
            day_exists = any(entry["date"] == i for entry in result)
            if not day_exists:
                result.append(
                    {
                        "date": i,
                        "educationFeedName": "educationFeed",
                        "entertainmentFeedName": "entertainmentFeed",
                        "educationFeedCount": 0,
                        "entertainmentFeedCount": 0,
                    }
                )

        result.sort(key=lambda x: x["date"])
        print(result)
    return jsonify({"heatMapData": result})


# Check to see if Data is fetched on First clicks Data
@app.route("/getFirstClicksData", methods=["GET"])
def get_first_click_info():
    userId = request.args.get("userId", "")

    ref = db.reference("users").child(userId).child("firstClickInfo")

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
                        "count": duration_data["count"],
                        "feed": feed_name,
                    }
                )
    return jsonify({"firstClickData": new_format})


# Check to getKeywordData
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
    return jsonify({"firstClickData": new_format})


# Check to fetch user watch video history
@app.route("/getWatchVideoHistory", methods=["GET"])
def get_watch_video_history():
    userId = request.args.get("userId", "")

    ref = db.reference("users").child(userId).child("watchHistory")
    ref_val = ref.get()

    result_list = []
    if ref_val is None:
        return jsonify({"videoHistory": result_list})
    else:
        print(ref_val)
        # Iterate through the nested dictionary
        for date, feed_data in ref_val.items():
            for feed_type, video_data in feed_data.items():
                for video_id, video_info in video_data.items():
                    # Extract the relevant information and add it to the result list
                    extracted_info = {
                        "creator": video_info["videoDetails"]["creator"],
                        "duration": video_info["videoDetails"]["duration"],
                        "id": video_info["videoDetails"]["id"],
                        "thumbnail": video_info["videoDetails"]["thumbnail"],
                        "title": video_info["videoDetails"]["title"],
                        "url": video_info["videoDetails"]["url"],
                        "watchTime": video_info["watchTime"],
                    }
                    result_list.append(extracted_info)

                    for res in result_list:
                        print(f"res => {res}")

                    return jsonify({"videoHistory": result_list})


if __name__ == "__main__":
    app.run(debug=True)

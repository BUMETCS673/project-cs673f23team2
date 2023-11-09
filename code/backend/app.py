import json
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

from firebase_admin import firestore
import requests

from configs.firebase_config import setup_firebase
from isodate import parse_duration

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
    video_fetch_url = "https://www.googleapis.com/youtube/v3/search"
    video_data_fetch_url = "https://www.googleapis.com/youtube/v3/videos"

    key = "AIzaSyC_lqU7NrJaNalsNM0w1OlikduwRvPLUqY"
    search_query = request.args.get("q", "Learn Flask")
    max_results = request.args.get("maxResults", 1)
    video_duration = request.args.get("videoDuration", "any")
    params = {
        "key": key,
        "q": search_query,
        "part": "snippet",
        "type": "video",
        "maxResults": max_results,
        "videoDuration": video_duration,
    }

    res = requests.get(video_fetch_url, params=params)
    videoList = res.json()["items"]
    videoIds = []
    for video in videoList:
        videoIds.append(video["id"]["videoId"])

    video_data_params = {
        "key": key,
        "id": ",".join(videoIds),
        "part": "snippet,contentDetails",
        "maxResults": max_results,
    }

    video_data_res = requests.get(video_data_fetch_url, params=video_data_params)
    videoDataList = video_data_res.json()["items"]
    video_results = []
    for videoData in videoDataList:
        videoElement = {
            "id": videoData["id"],
            "url": f'https://www.youtube.com/watch?v={videoData["id"]}',
            "thumbnail": videoData["snippet"]["thumbnails"]["medium"]["url"],
            "duration": int(
                parse_duration(videoData["contentDetails"]["duration"]).total_seconds()
                // 60
            ),
            "title": videoData["snippet"]["title"],
            "creator": videoData["snippet"]["channelTitle"],
        }
        video_results.append(videoElement)

    return jsonify(video_results)


@app.route("/fetchvideodata", methods=["GET"])
def fetch_video_data_from_youtube_api():
    api_url = "https://www.googleapis.com/youtube/v3/search"

    video_ids = request.args.get("ids", [])
    max_results = request.args.get("maxResults", 1)
    print("Parameters => ", video_ids, max_results)

    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(debug=True)

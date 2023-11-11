import json
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

from firebase_admin import firestore
import requests
from wrapper import fetch_video_data_from_youtube

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


if __name__ == "__main__":
    app.run(debug=True)

# Focused Study
## Software Engineering Term Project for Team 2

Team Member    | Roles
-------------- | -------------
Siddhesh Dighe | Team Leader
Pushkar        | Design Implementation Leader
Sai Ramya Devineni| QA Leader
Supriya        | Backup QA Leader
Ayush Bhaliya  | Security Leader
Paridhi Talwar | Requirement Leader
Deepali Chawla | Configuration Leader

## Overview ##

The use of social media and being constantly bombarded with notifications have made us addicted to our smartphones. This addiction is even more prevalent among young people and students. Platforms like Instagram, TikTok, and Twitter are designed with the goal of keeping us hooked to our phones by providing quick, flashy content that doesn’t require much focus. This makes it difficult to concentrate on one thing that takes more than a few minutes. The consequences are not just students receiving low grades but also students struggling with deep thinking and solving complex problems in different subjects. 
Video platforms like YouTube provide a lot of educational content but also many distractions that can divert your focus from learning. Solving this problem is where the motivation for our project, Focused Study comes from.

Focused Study aims to address the problem of distractions and declining attention spans when it comes to learning. It provides:
* Distraction-Free Learning: Users can search for educational videos using a single search bar similar to a Google search. The application will then curate a list of the best videos related to the user’s query using YouTube API. Each video would be selected based on multiple factors like best comments, likes-dislikes ratio, and overall views. This helps ensure all the videos suggested on the platform are high-quality.
* Gamification: Focused Study helps gamify the process of learning by rewarding users points for staying focused on learning while avoiding distractions. These points can be then used to access more entertainment-focused videos that are aligned with the user’s hobbies and interests.
* Analytics Dashboard: While the user is focused on learning from watching curated videos on the platform, behind the scenes the platform tracks the user’s watch time for educational and entertainment videos, to provide a dashboard that gives the user insight into his/her attention span and learning habits

## Tech Stack ##

![alt text](./doc/TechStack.png?raw=true)
 
Focused Study uses the following tech stack:
* Front-end: React
* Back-end: Flask
* Database: Firebase Realtime Database + Firestore
* Deployment: Docker

## Project Setup and Run Guide

### Setup backend flask app (locally)
1. Go to backend director `cd /code/backend`
2. Install all the necessary plugins `pip install -r requirements.txt`
3. Make sure all the requirements are install correctly
4. Once requirements are installed, start the Flask app using `python app.py`

You should see below message as an indicator that Flask server is up
<img width="1217" alt="image" src="https://github.com/BUMETCS673/project-cs673f23team2/assets/13947675/77a14854-6e39-4a58-9d7d-48a5280d22b1">

### Test your flask app (locally)
- You can use API testing tool like Postman or Thunderclient to check the api connection
- Use below request
  GET http://127.0.0.1:5000/health
<img width="1296" alt="image" src="https://github.com/BUMETCS673/project-cs673f23team2/assets/13947675/111f3b8d-679f-4efd-b19c-103f648b3e06">



### Setup frontend react app (locally)
1. Go to frontend director `cd /code/frontend`
2. Install all the necessary plugins using `npm install`
3. Make sure all the requirements are install correctly
4. Once requirements are installed, start the react app using `npm start`

You should see below message as an indicator that Flask server is up
<img width="465" alt="image" src="https://github.com/BUMETCS673/project-cs673f23team2/assets/13947675/60600773-24dd-4bd6-a18e-ab95d3dc81bb">
<img width="459" alt="image" src="https://github.com/BUMETCS673/project-cs673f23team2/assets/13947675/1cc8a636-ecd2-4134-9a9d-1ffb7d60d972">

5. Navigate to http://localhost:3000/

You should see the homescreen for the app
<img width="1026.5" alt="image" src="https://github.com/BUMETCS673/project-cs673f23team2/assets/13947675/fb8d9299-130f-4d6f-99a4-7b2f312dd821">



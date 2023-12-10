import firebase_admin
from firebase_admin import credentials


def setup_firebase():
    cred =credentials.Certificate("code/backend/configs/serviceAccountKey.json") 
    
    firebase_admin.initialize_app(
        cred,
        {"databaseURL": "https://focused-study-f648a-default-rtdb.firebaseio.com/"},
    )

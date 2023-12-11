import firebase_admin
from firebase_admin import credentials


def setup_firebase():
    cred =credentials.Certificate({
  "type": "service_account",
  "project_id": "focused-study-f648a",
  "private_key_id": "d23cd141dfebaf40b0e23a2ec105e5ea2d31c9e1",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCg6oHgsUiU2Cy7\n1bh+zlJervNCmFIN5fmTSJXXeh1gVknh5RYKIThwoO1LZMBQAZrpc6RiPIT/su+s\n1T5epd/r0UsyIG09cLdXexq+vAsIJxUtLAQlAgdeVgXottho5dp2h3J4VlHp+Ez9\n/AAJY3EW48mL2TZkhulwuwp9sFsU5YTbEN4drpCPJFdGybo+QttVhHG+BiBuaUFb\nDKi1thMI/irQrbpfT5uv/Lk4ffmhDZfkJl8rhLPH2BZKH4yovZqf6dJbT69VMP6S\nAMK1F1SmUjSeRK2SdNKPoH2q4VfFlQwiwsxz+UoiH3YxRWStyctCid9aB7PuoRz1\niTqXr76xAgMBAAECggEAEjmNHSQnCsiTBHEXtLDsblHVNkknHfDae95gLifj9NnB\nA2cdQGdzy3nGdmACUe1knKUezIt7KrSa5ZG/Pxv9SOmK4TH//VHrSeqk5E5K15EJ\nmnSeQYzBxeLrR2iSCQtjW0JK6isomt2m5qsoW+fZ0pRY6tBekzMedEiSzxpurmaE\nSRZaGHsL9DWkoUk+bOHFKq2+KruOPvgxD9krkVRLkFeCzPYQDk3bseUf7M1ddmnJ\nf1ey9vSjsILD2+5eqlDTl86ID0f8m5yislTVgrgsh/HC0Ak8QRJLoeTn9N5zbg6N\n5hPVV0YD70tQ6ziC8OadYQJ1AHOsAUqFCi0N8GeSUwKBgQDUFtFxZ/g2N+d2qI+f\nyT/gTJ2j6yTztpwAocYWK3UhB1RdrDVMMunu2DFlo8AhYb6pCO/hrO/46THuuQn4\nsnoIDWUK+YPZqRx6j0iTskA/SKg6qRoOcs3o1igYEvNwuy92tE0uP5dhLHKnEMS8\nkTRqUnUEq0odCtEAMF+Is5tTQwKBgQDCO2evYlzsXIdUOuahg7b7Fpjcz3UaE04f\nY1YlvgKgR0LPYqApdQ2AkQ/hixMPSIaV1XaqPVKkg+QRb0+ahp75NYwczWKlEqB/\ns1ceJM5iJzY8vJ5yACBuNdJZ6MJZUnJHCCM9+X8Hhi2nxd2v6MuWPMZoLglC6J+X\nVwRFAh60+wKBgBuRp8INGMe7dpwHBzxnBaWbb/Zpz5DakObIIJ6rIXucn0vZ4ce4\n6o3AjpM+uO/d69G/NqdoOn1pmrMEXJZ2ZMR9MUA+9POrNud7jpycVBulzzBo4Nk1\n9SwqAmY2uGxT+LR+dXXokD3ycCjlVh2I5n5Xn5xuw6CI0mgq4ZA8gJlPAoGBALcF\n+UcHvh4vdooFUqvhjLv/aB2yE1t104i6N0QrTxgu7iKzgc5u8UEz8C4MufIN2lw4\nILB8RnKloXRYWj93GTgloBjH5Gs+KSUMHkxWTG+rGW2UIw2zVtvjNYrpTLGUggCz\nB1pvzqaNZloQljwbdjPkouUqdCmrQC8AnRJV1A+fAoGAfwlBks3eznjHn7SbQ+Jw\nGeEpQbzETrxTO7QZ65MMFXSujXkefTi7p3RtADi9+eb6cBocOmY2hkjltcLItAin\nr3wKpoggFnRX990SuXfQfgMghThvMSQju0YYF+0HPhUmkQrJvPFAEqTXi0J6f0qG\nzw0X6HMm23J2A4sG/9VjiO0=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-i6wok@focused-study-f648a.iam.gserviceaccount.com",
  "client_id": "101170712228082819171",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-i6wok%40focused-study-f648a.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
) 
    
    firebase_admin.initialize_app(
        cred,
        {"databaseURL": "https://focused-study-f648a-default-rtdb.firebaseio.com/"},
    )

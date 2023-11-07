import React from 'react';

function UserProfile() {
  return (
    <div>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>User Profile</title>
        <link rel="stylesheet" href="../styles/UserProfile.css" type="text/css" media="all" />
      </head>
      <body>
        <header>
          {/* Home Button */}
          <div className="home-container">
            <button id="home">🔄 Home</button>
          </div>

          {/* User Profile Container */}
          <div className="profile-container">
            <div className="profile-pic">
              <div className="profile-pic">
                <img
                  src="https://www.shareicon.net/data/256x256/2016/09/15/829472_man_512x512.png"
                  alt="Profile Image"
                />{' '}
                {/* Replace with your image */}
              </div>
            </div>
            <span>Supriya Uppala</span>
          </div>
          <span></span> {/* Placeholder element */}
        </header>

        <section className="hobbies">
          <h2>Hobbies:</h2>
          <button>Singing</button>
          <button>Dancing</button>
          <button>Tennis</button>
        </section>

        <section className="video-history">
          <h2>Video History</h2>
          <div className="videos">
            <iframe
              width="300"
              height="300"
              src="https://www.youtube.com/embed/Z1RJmh_OqeA"   
              frameborder="0"
              allowfullscreen
            ></iframe>
            <iframe
              width="300"
              height="300"
              src="https://www.youtube.com/embed/pTFZFxd4hOI"
              frameborder="0"
              allowfullscreen
            ></iframe>
            <iframe
              width="300"
              height="300"
              src="https://www.youtube.com/embed/xk4_1vDrzzo"
              frameborder="0"
              allowfullscreen
            ></iframe>
            <button>See All</button>
          </div>
        </section>

        <footer>
          {/* Footer Buttons */}
          <button>Clear History</button>
          <button>Delete Profile</button>
          <button>Logout</button>
        </footer>
      </body>
    </div>
  );
}

export default UserProfile;
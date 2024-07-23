# Workoutapp

Workout Tracker
This is a workout tracker web application for two users, Aaron and Zoey. The application allows users to log their workouts, keep notes, set workout and rest timers, and view motivational quotes. Additionally, there is a feature for tracking running distance using geolocation.
Table of Contents
    • Features
    • Screenshots
    • Installation
    • Usage
    • File Structure
    • Technologies Used
    • License
Features
    • Separate workout logs for Aaron and Zoey
    • Notepad for each user to write and save notes
    • Timer with workout and rest periods
    • Motivational quotes displayed on each user's page
    • Geolocation-based run tracker
    • Responsive design with Bootstrap
Screenshots
Installation
    1. Clone the repository:
       sh
       Copy code
       git clone https://github.com/yourusername/workout-tracker.git
    2. Navigate to the project directory:
       sh
       Copy code
       cd workout-tracker
Usage
    1. Open index.html in your preferred web browser to access the main page.
    2. Navigate to Aaron's or Zoey's workout tracker by clicking on the respective buttons.
    3. Use the workout form to log exercises, time, and comments.
    4. Use the notepad to save any notes or workout plans.
    5. Start the workout and rest timers as needed.
    6. Use the run tracker to log running distances and view the route on the map.
File Structure
Copy code
workout-tracker/
├── index.html
├── Aaron.html
├── Zoey.html
├── Rmiles.html
├── indexWorkout.js
├── styles.css
├── PRF.png
├── Waltograph.ttf
├── AccPhoto.jpg
├── Zoey.png
└── README.md
index.html
The main landing page with links to Aaron's and Zoey's workout trackers and the run tracker.
Aaron.html
Aaron's workout tracker page with form inputs for logging workouts, a notepad, and a timer.
Zoey.html
Zoey's workout tracker page with similar functionalities as Aaron's page.
Rmiles.html
Run tracker page to track running distance using geolocation and display the route on a map.
indexWorkout.js
JavaScript file containing the logic for logging workouts, handling the notepad, timer functionality, displaying quotes, and run tracking.
styles.css
Custom CSS file for additional styling (if needed).
Technologies Used
    • HTML5
    • CSS3
    • JavaScript
    • Bootstrap 4.5
    • jQuery
    • Mapbox API (for run tracking)
License
This project is licensed under the MIT License. See the LICENSE file for more details.

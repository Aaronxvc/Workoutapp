// Define global variables
const aaronWorkouts = [];
const zoeyWorkouts = [];
const quotes = [
    "The only way to make sense out of change is to plunge into it, move with it, and join the dance. — Alan Watts",
    "The only one who can limit greatness is oneself. — Barbie",
    "Happiness is not something ready-made. It comes from actions. — Dalai Lama",
    "The best way to predict the future is to invent it. — Alan Kay",
    "Brains are in the head. Feet are in the shoes. One can steer oneself in any direction chosen. — Dr. Seuss",
    "Believing in oneself is halfway to achievement. — Theodore Roosevelt",
    "Be the change wished to be seen in the world. — Mahatma Gandhi",
    "Everything ever wanted is on the other side of fear. — George Addair",
    "The journey of a thousand miles begins with one step. — Lao Tzu",
    "Act as if actions make a difference. They do. — William James",
    "Missing 100% of the shots not taken. — Wayne Gretzky",
    "Success is not the key to happiness. Happiness is the key to success. Loving what is done leads to success. — Albert Schweitzer",
    "In the end, not the words of enemies will be remembered, but the silence of friends. — Martin Luther King Jr.",
    "The only limit to realization of tomorrow is doubts of today. — Franklin D. Roosevelt",
    "What lies behind and before are tiny matters compared to what lies within. — Ralph Waldo Emerson",
    "Greatness does not require being great to start, but starting is required to be great. — Zig Ziglar",
    "The future belongs to those who believe in the beauty of dreams. — Eleanor Roosevelt",
    "Life is what happens when busy making other plans. — John Lennon",
    "The only person destined to become is the person decided upon. — Ralph Waldo Emerson",
    "Do not wait to strike till the iron is hot, but make it hot by striking. — William Butler Yeats",
    "Never too old to set another goal or to dream a new dream. — C.S. Lewis",
    "Success usually comes to those who are too busy to be looking for it. — Henry David Thoreau",
    "Life is 10% what happens and 90% how it is reacted to. — Charles R. Swindoll",
    "The harder the work for something, the greater the feeling when it is achieved. — Unknown",
];

let timerInterval;
let isWorkoutPhase = true;

document.addEventListener('DOMContentLoaded', () => {
    const saveNoteButton = document.getElementById('save-note');
    const clearNoteButton = document.getElementById('clear-note');
    const startTimerButton = document.getElementById('start-timer');
    const stopTimerButton = document.getElementById('stop-timer');
    const form = document.getElementById('Aaron-workout-form') || document.getElementById('Zoey-workout-form');

    if (saveNoteButton) {
        saveNoteButton.addEventListener('click', saveNote);
    }

    if (clearNoteButton) {
        clearNoteButton.addEventListener('click', clearNote);
    }

    if (startTimerButton) {
        startTimerButton.addEventListener('click', () => {
            const workoutTime = parseInt(document.getElementById('workout-time').value, 10) || 0;
            const restTime = parseInt(document.getElementById('rest-time').value, 10) || 0;
            startTimer(workoutTime, restTime);
        });
    }

    if (stopTimerButton) {
        stopTimerButton.addEventListener('click', stopTimer);
    }

    if (form) {
        form.addEventListener('submit', addWorkout);
    }

    loadWorkouts();
    displayRandomQuote();
    loadNote();
});

function saveNote() {
    const noteContent = document.getElementById('notepad-content').value;
    localStorage.setItem(`${getCurrentUser()}-note`, noteContent);
}

function loadNote() {
    const noteContent = localStorage.getItem(`${getCurrentUser()}-note`);
    if (noteContent) {
        document.getElementById('notepad-content').value = noteContent;
    }
}

function clearNote() {
    document.getElementById('notepad-content').value = '';
    localStorage.removeItem(`${getCurrentUser()}-note`);
}

function startTimer(workoutSeconds, restSeconds) {
    let timeRemaining = isWorkoutPhase ? workoutSeconds : restSeconds;
    displayTime(timeRemaining);

    timerInterval = setInterval(() => {
        timeRemaining--;

        if (timeRemaining < 0) {
            isWorkoutPhase = !isWorkoutPhase;
            timeRemaining = isWorkoutPhase ? workoutSeconds : restSeconds;
            alert(isWorkoutPhase ? "Start your workout!" : "Time to rest!");
        }

        displayTime(timeRemaining);
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function displayTime(seconds) {
    const timerDisplay = document.getElementById('timer-display');
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function getCurrentUser() {
    return document.title.includes("Aaron") ? "Aaron" : "Zoey";
}

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function displayRandomQuote() {
    const quoteElement = document.getElementById('quote');
    if (quoteElement) {
        quoteElement.textContent = getRandomQuote();
    }
}

function addWorkout(e) {
    e.preventDefault();
    
    const person = getCurrentUser();
    const exerciseName = document.getElementById('exerciseName').value;
    const reps = document.getElementById('reps').value;
    const time = document.getElementById('time').value;
    const comment = document.getElementById('comments').value;
   
    const workout = { exerciseName, reps, time, comment };

    if (person === 'Aaron') {
        aaronWorkouts.push(workout);
        viewLog('Aaron');
    } else if (person === 'Zoey') {
        zoeyWorkouts.push(workout);
        viewLog('Zoey');
    }

    saveWorkouts();
    e.target.reset();
}

function viewLog(type) {
    const logDiv = document.getElementById('log');
    logDiv.innerHTML = '';

    let workouts = [];
    if (type === 'Aaron') {
        workouts = aaronWorkouts;
    } else if (type === 'Zoey') {
        workouts = zoeyWorkouts;
    }

    workouts.forEach((workout, index) => {
        const workoutDiv = document.createElement('div');
        workoutDiv.className = 'workout-item';
        workoutDiv.innerHTML = `
            <p>Exercise: ${workout.exerciseName}</p>
            <p>Reps: ${workout.reps}</p>
            <p>Time: ${workout.time} minutes</p>
            <p>Comment: ${workout.comment}</p>
            <button onclick="editWorkout('${type}', ${index})">Edit</button>
            <button onclick="deleteWorkout('${type}', ${index})">Delete</button>
        `;
        logDiv.appendChild(workoutDiv);
    });
}

function saveWorkouts() {
    localStorage.setItem('Aaron Workouts', JSON.stringify(aaronWorkouts));
    localStorage.setItem('Zoey Workouts', JSON.stringify(zoeyWorkouts));
}

function loadWorkouts() {
    const storedAaronWorkouts = localStorage.getItem('Aaron Workouts');
    const storedZoeyWorkouts = localStorage.getItem('Zoey Workouts');

    if (storedAaronWorkouts) {
        aaronWorkouts.push(...JSON.parse(storedAaronWorkouts));
    }
    if (storedZoeyWorkouts) {
        zoeyWorkouts.push(...JSON.parse(storedZoeyWorkouts));
    }

    // Refresh the logs after loading workouts
    viewLog(getCurrentUser());
}

function editWorkout(type, index) {
    const workout = type === 'Aaron' ? aaronWorkouts[index] : zoeyWorkouts[index];

    document.getElementById('exerciseName').value = workout.exerciseName;
    document.getElementById('reps').value = workout.reps;
    document.getElementById('time').value = workout.time;
    document.getElementById('comments').value = workout.comment;

    // Remove the old workout entry
    if (type === 'Aaron') {
        aaronWorkouts.splice(index, 1);
    } else if (type === 'Zoey') {
        zoeyWorkouts.splice(index, 1);
    }

    saveWorkouts();
    viewLog(type);
}

function deleteWorkout(type, index) {
    if (type === 'Aaron') {
        aaronWorkouts.splice(index, 1);
    } else if (type === 'Zoey') {
        zoeyWorkouts.splice(index, 1);
    }

    saveWorkouts();
    viewLog(type);
}

// Button color changer
document.addEventListener('DOMContentLoaded', () => {
    const applyColorButton = document.getElementById('apply-color');
    const colorInput = document.getElementById('color-input');

    if (applyColorButton && colorInput) {
        applyColorButton.addEventListener('click', () => {
            const color = colorInput.value;
            document.body.style.backgroundColor = color;
        });
    }
});



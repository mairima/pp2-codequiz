// Array of question objects, each with a question, multiple answers, and the correct answer
//HTML Quiz Questions
const questions = [

    {
        question: "Choose the correct HTML element for the largest heading:",
        answers: [
            { text: "<h6>", correct: false },
            { text: "<heading>", correct: false },
            { text: "<head>", correct: false },
            { text: "<h1>", correct: true }
        ]
    },

    {
        question: "Which HTML tag is used to define an internal style sheet?",
        answers: [
            { text: "<style>", correct: true },
            { text: "<css>", correct: false },
            { text: "<script>", correct: false },
            { text: "<link>", correct: false }
        ]
    },
    {
        question: "Which HTML element is used to display a line break?",
        answers: [
            { text: "<br>", correct: true },
            { text: "<lb>", correct: false },
            { text: "<break>", correct: false },
            { text: "<line>", correct: false }
        ]
    },

    // CSS
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Cascading Style Sheets", correct: true },
            { text: "Computer Style Sheets", correct: false },
            { text: "Creative Style Sheets", correct: false },
            { text: "Colorful Style Syntax", correct: false }
        ]
    },
    {
        question: "Which CSS property controls the text size?",
        answers: [
            { text: "font-size", correct: true },
            { text: "text-style", correct: false },
            { text: "font-style", correct: false },
            { text: "text-size", correct: false }
        ]
    },
    {
        question: "How do you insert a comment in CSS?",
        answers: [
            { text: "/* comment */", correct: true },
            { text: "// comment", correct: false },
            { text: "<!-- comment -->", correct: false },
            { text: "# comment", correct: false }
        ]
    },

    // JavaScript
    {
        question: "Which symbol is used for comments in JavaScript?",
        answers: [
            { text: "// comment", correct: true },
            { text: "<!-- comment -->", correct: false },
            { text: "# comment", correct: false },
            { text: "/* comment */", correct: false }
        ]
    },
    {
        question: "Which method is used to write to the browser console?",
        answers: [
            { text: "console.log()", correct: true },
            { text: "log.console()", correct: false },
            { text: "print()", correct: false },
            { text: "alert.log()", correct: false }
        ]
    },
    {
        question: "How do you declare a variable in JavaScript?",
        answers: [
            { text: "let x = 5;", correct: true },
            { text: "variable x = 5;", correct: false },
            { text: "v x = 5;", correct: false },
            { text: "int x = 5;", correct: false }
        ]
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        answers: [
            { text: "onclick", correct: true },
            { text: "onchange", correct: false },
            { text: "onmouseclick", correct: false },
            { text: "onhover", correct: false }
        ]
    }
];
// Game variables
let currentQuestionIndex = 0; // Tracks the current question being displayed
let correctCount = 0;  // Counter for correct answers
let incorrectCount = 0;// Counter for incorrect answers
let timeLeft = 100; // Timer starting at 100 seconds
let timer; // To store the timer interval
let playerName = ""; // To store the player's name
// DOM elements
const questionEl = document.getElementById("question"); // Question element
const answerButtons = document.getElementById("answer-buttons"); // Container for answer buttons
const nextButton = document.getElementById("next-btn"); // "Next" button element
const timeDisplay = document.getElementById("time"); // Time display element
let highscoreContainer = document.getElementById("highscore"); // High score container
const timeUsed = 100 - timeLeft; // Time used for the quiz

// Starts the game by initializing values and displaying the first question
function startGame() {
    // Only prompt for name if it's not already set
    if (!playerName) {
        // Get the input element for the player's name
        const nameInput = document.getElementById("playerName");
        // Check if the input is empty or only whitespace
        if (!nameInput.value.trim()) {
            // Show an alert prompting the user to enter their name
            alert("Please enter your name to start the quiz.");
            // Set focus back to the input field for convenience
            nameInput.focus();
            // Stop the function from continuing
            return;
        }
        playerName = nameInput.value.trim(); // Get player's name from input
    }
    document.getElementById("displayName").textContent = playerName; // Display player's name

    document.getElementById("nameModal").style.display = "none"; // Hide name entry modal
    // Initialize game state
    currentQuestionIndex = 0; // Reset question index
    correctCount = 0; // Reset correct count
    incorrectCount = 0; // Reset incorrect count
    timeLeft = 100; // Reset timer
    document.getElementById("correctCount").textContent = "0"; // Update the correct count display
    document.getElementById("incorrectCount").textContent = "0"; // Update the incorrect count display
    document.getElementById("score-message").textContent = ""; // Clear score message

    shuffleQuestions(questions); // Shuffle questions for random order
    startTimer(); // Start the timer
    showQuestion();// Display the first question

}
// Starts the timer and updates the time display
function startTimer() {
    timer = setInterval(() => {
        timeLeft--; // Decrease time by 1 second
        timeDisplay.innerText = timeLeft; // Update the time display
        if (timeLeft <= 0) {  // If time runs out
            clearInterval(timer); // Stop the timer
            showScore();  // Show the score screen
        }
    }, 1000); // Timer interval of 1 second
}
// Displays the current question and answer options
function showQuestion() {
    resetState(); // Reset the state before showing a new question
    const current = questions[currentQuestionIndex]; // Get the current question
    questionEl.innerText = current.question; // Display the question

    // Shuffle the current question's answers
    const shuffledAnswers = [...current.answers].sort(() => Math.random() - 0.5);

    // Loop through each shuffled answer option
    shuffledAnswers.forEach(answer => {
        // Create a new button element for the answer
        const btn = document.createElement("button");
        // Set the button text to the answer text
        btn.innerText = answer.text;
        // Add the CSS class for styling
        btn.classList.add("answer-btn");
        // If this answer is correct, mark it with a data attribute
        if (answer.correct) btn.dataset.correct = answer.correct;
        // Add a click event listener to handle answer selection
        btn.addEventListener("click", selectAnswer);
        // Create a list item to wrap the button (for layout)
        const li = document.createElement("li");
        li.appendChild(btn);
        // Append the list item to the answer buttons container
        answerButtons.appendChild(li);
    });
}
// Resets the game state before showing a new question
function resetState() {
    nextButton.style.display = "none"; // Hide the "Next" button initially
    answerButtons.innerHTML = ""; // Clear previous answer buttons
}
// Handles the selection of an answer
function selectAnswer(e) {
    const selectedBtn = e.target; // Get the selected button
    const correct = selectedBtn.dataset.correct === "true"; //Check if the selected answer is correct
    if (correct) {
        correctCount++; // Increment correct count
        selectedBtn.style.backgroundColor = "#28a745"; // Green background for correct answer
    } else {
        incorrectCount++; // Increment incorrect count 
        selectedBtn.style.backgroundColor = "#dc3545";// Red background for incorrect answer
    }
    // Update score display
    document.getElementById("correctCount").textContent = correctCount;
    document.getElementById("incorrectCount").textContent = incorrectCount;
    // Disable all buttons after answering
    Array.from(answerButtons.children).forEach(li => {
        const btn = li.firstChild;
        btn.disabled = true;
        if (btn.dataset.correct === "true") {
            btn.style.backgroundColor = "#28a745";  // Highlight correct answer
        }
    });
    nextButton.style.display = "inline-block"; // Show the "Next" button
}
// Displays the score at the end of the game
function showScore() {
    clearInterval(timer); // Stop the timer
    resetState(); // Reset state
    //Add Time used and Final Score to the score message
    const timeUsed = 100 - timeLeft;
    const finalScore = correctCount * 10 + timeLeft;
    // Display score message
    questionEl.innerText = `${playerName}, you got ${correctCount} correct and ${incorrectCount} incorrect!
    Time used: ${timeUsed} seconds.
    Your final score is ${finalScore}.`;

    nextButton.innerText = "Play Again";
    nextButton.style.display = "inline-block";
    setHighScore(finalScore, timeUsed); // Pass new values
    getHighScores();
}
// Handles the "Next" button functionality
function handleNextButton() {
    currentQuestionIndex++; // Move to the next question
    if (currentQuestionIndex < questions.length && timeLeft > 0) {
        showQuestion(); // Display the next question
    } else {
        showScore(); // If no more questions or time runs out, show the score screen
    }
}
// Event listener for the "Next" button
nextButton.addEventListener("click", () => {

    if (nextButton.innerText === "Play Again") {
        // just restart the game without prompting for name again
        startGame();
    } else {
        handleNextButton();
    }
});
// Saves the current score to localStorage for high score tracking
function setHighScore(finalScore, timeUsed) {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || []; //Get existing high scores from localStorage
    const newScore = {
        name: playerName, // Store player name
        score: finalScore, // Store player score
        timeUsed: timeUsed // Store time used
    };
    highScores.push(newScore); // Add new score to the list
    localStorage.setItem("highScores", JSON.stringify(highScores)); // Save updated high scores to localStorage
}
// Retrieves and displays the top 5 high scores from localStorage
function getHighScores() {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || []; // Get high scores from localStorage
    highScores = highScores.sort((a, b) => b.score - a.score).slice(0, 5); // Sort and get top 5 high scores
    highscoreContainer.innerHTML = ` <h2>High Scores</h2>
<ol id="highscore-list">
  ${highScores.map(score => `<li>${score.name}: ${score.score} points (Time used: ${score.timeUsed}s)</li>`).join("")}
</ol>`; // Display high scores and time in the container
}
// shuffles the questions array to randomize the order of questions
function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Pick a random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

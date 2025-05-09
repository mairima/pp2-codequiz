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
let currentQuestionIndex = 0
let correctCount = 0
let incorrectCount = 0
let timeLeft = 150
let timer
let playerName = ""
// DOM elements
const questionEl = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")
const timeDisplay = document.getElementById("time")
let highscoreContainer = document.getElementById("highscore")
// Starts the game by initializing values and displaying the first question
function startGame() {
    playerName = document.getElementById("playerName").value || "Player" // Get player's name
    document.getElementById("displayName").textContent = playerName // Display player's name
    document.getElementById("nameModal").style.display = "none" // Hide name entry modal
    currentQuestionIndex = 0 // Reset question index
    correctCount = 0 // Reset correct count
    incorrectCount = 0 // Reset incorrect count
    timeLeft = 150 // Reset timer
    document.getElementById("correctCount").textContent = "0" // Update the correct count display
    document.getElementById("incorrectCount").textContent = "0" // Update the incorrect count display
    document.getElementById("score-message").textContent = "" // Clear score message
    shuffleQuestions(questions); // Shuffle questions for random order
    startTimer() // Start the timer
    showQuestion() // Display the first question
    updateProgressBar() // Update the progress bar
}
// Starts the timer and updates the time display
function startTimer() {
    timer = setInterval(() => {
        timeLeft--  // Decrease time by 1 second
        timeDisplay.innerText = timeLeft // Update the time display
        if (timeLeft <= 0) {  // If time runs out
            clearInterval(timer) // Stop the timer
            showScore()  // Show the score screen
        }
    }, 1000) // Timer interval of 1 second
}
// Displays the current question and answer options
function showQuestion() {
    resetState() // Reset the state before showing a new question
    const current = questions[currentQuestionIndex] // Get the current question
    questionEl.innerText = current.question // Display the question
    current.answers.forEach(answer => {
        const btn = document.createElement("button") // Create button for each answer
        btn.innerText = answer.text // Set button text
        btn.classList.add("answer-btn") // Add class for styling
        if (answer.correct) btn.dataset.correct = answer.correct // Mark the correct answer
        btn.addEventListener("click", selectAnswer) // Add event listener to handle answer selection
        const li = document.createElement("li") // Create list item for each answer
        li.appendChild(btn) // Append the button to the list item
        answerButtons.appendChild(li) // Add the list item to the answer buttons container
    })
}
// Resets the game state before showing a new question
function resetState() {
    nextButton.style.display = "none" // Hide the "Next" button initially
    answerButtons.innerHTML = "" // Clear previous answer buttons
}
// Handles the selection of an answer
function selectAnswer(e) {
    const selectedBtn = e.target // Get the selected button
    const correct = selectedBtn.dataset.correct === "true" //Check if the selected answer is correct
    if (correct) {
        correctCount++ // Increment correct count
        selectedBtn.style.backgroundColor = "#28a745" // Green background for correct answer
    } else {
        incorrectCount++ // Increment incorrect count 
        selectedBtn.style.backgroundColor = "#dc3545"// Red background for incorrect answer
    }
    // Update score display
    document.getElementById("correctCount").textContent = correctCount
    document.getElementById("incorrectCount").textContent = incorrectCount
     // Disable all buttons after answering
    Array.from(answerButtons.children).forEach(li => {
        const btn = li.firstChild
        btn.disabled = true
        if (btn.dataset.correct === "true") {
            btn.style.backgroundColor = "#28a745"  // Highlight correct answer
        }
    })
    nextButton.style.display = "inline-block" // Show the "Next" button
}
// Displays the score at the end of the game
function showScore() {
    clearInterval(timer) // Stop the timer
    resetState() // Reset state
    questionEl.innerText = `${playerName}, you got ${correctCount} correct and ${incorrectCount} incorrect!` // Display score message
    nextButton.innerText = "Play Again" // Change button text to "Play Again"
    nextButton.style.display = "inline-block" // Show the "Play Again" button
    setHighScore() // Save the score to localStorage
    getHighScores() // Display high scores
}
// Handles the "Next" button functionality
function handleNextButton() {
    currentQuestionIndex++ // Move to the next question
    if (currentQuestionIndex < questions.length && timeLeft > 0) {
        showQuestion() // Display the next question
    } else {
        showScore() // If no more questions or time runs out, show the score screen
    }
}
// Event listener for the "Next" button
nextButton.addEventListener("click", () => {

    if (nextButton.innerText === "Play Again") {
        location.reload() // Reload the page to restart the game
    } else {
        updateProgressBar()
        handleNextButton()
    }
})
// Updates the progress bar based on the current question index
const totalQuestions = questions.length;

function updateProgressBar() {
    const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    document.getElementById("progress-fill").style.width = `${progressPercent}%`;
    document.getElementById("progress-text").textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
}
// Saves the current score to localStorage for high score tracking
function setHighScore() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || []; //Get existing high scores from localStorage
    const newScore = {
        name: playerName, // Store player name
        score: correctCount // Store player score
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
 ${highScores.map(score => `<li>${score.name}: ${score.score}</li>`).join("")}
`; // Display the top 5 high scores
}
// shuffles the questions array to randomize the order of questions
function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Pick a random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

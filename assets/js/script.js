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

let currentQuestionIndex = 0
let correctCount = 0
let incorrectCount = 0
let timeLeft = 150
let timer
let playerName = ""

const questionEl = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")
const timeDisplay = document.getElementById("time")
let highscoreContainer = document.getElementById("highscore") 

function startGame() {
    playerName = document.getElementById("playerName").value || "Player"
    document.getElementById("displayName").textContent = playerName
    document.getElementById("nameModal").style.display = "none"
    currentQuestionIndex = 0
    correctCount = 0
    incorrectCount = 0
    timeLeft = 150
    document.getElementById("correctCount").textContent = "0"
    document.getElementById("incorrectCount").textContent = "0"
    document.getElementById("score-message").textContent = ""
    startTimer()
    showQuestion()
    updateProgressBar()
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--
        timeDisplay.innerText = timeLeft
        if (timeLeft <= 0) {
            clearInterval(timer)
            showScore()
        }
    }, 1000)
}
function showQuestion() {
    resetState()
    const current = questions[currentQuestionIndex]
    questionEl.innerText = current.question
    current.answers.forEach(answer => {
        const btn = document.createElement("button")
        btn.innerText = answer.text
        btn.classList.add("answer-btn")
        if (answer.correct) btn.dataset.correct = answer.correct
        btn.addEventListener("click", selectAnswer)
        const li = document.createElement("li")
        li.appendChild(btn)
        answerButtons.appendChild(li)
    })
}

function resetState() {
    nextButton.style.display = "none"
    answerButtons.innerHTML = ""
}

function selectAnswer(e) {
    const selectedBtn = e.target
    const correct = selectedBtn.dataset.correct === "true"
    if (correct) {
        correctCount++
        selectedBtn.style.backgroundColor = "#28a745"
    } else {
        incorrectCount++
        selectedBtn.style.backgroundColor = "#dc3545"
    }
    document.getElementById("correctCount").textContent = correctCount
    document.getElementById("incorrectCount").textContent = incorrectCount
    Array.from(answerButtons.children).forEach(li => {
        const btn = li.firstChild
        btn.disabled = true
        if (btn.dataset.correct === "true") {
            btn.style.backgroundColor = "#28a745"
        }
    })
    nextButton.style.display = "inline-block"
}

function showScore() {
    clearInterval(timer)
    resetState()
    questionEl.innerText = `${playerName}, you got ${correctCount} correct and ${incorrectCount} incorrect!`
    nextButton.innerText = "Play Again"
    nextButton.style.display = "inline-block"
    setHighScore()
    getHighScores()
}

function handleNextButton() {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length && timeLeft > 0) {
        showQuestion()
    } else {
        showScore()
    }
}



nextButton.addEventListener("click", () => {

    if (nextButton.innerText === "Play Again") {
        location.reload()
    } else {
        updateProgressBar()
        handleNextButton()
    }
})

const totalQuestions = questions.length;

function updateProgressBar() {
    const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    document.getElementById("progress-fill").style.width = `${progressPercent}%`;
    document.getElementById("progress-text").textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
}

function setHighScore() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const newScore = {
        name: playerName,
        score: correctCount
    };
    highScores.push(newScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function getHighScores() {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores = highScores.sort((a, b) => b.score - a.score).slice(0, 5);
    highscoreContainer.innerHTML = ` <h2>High Scores</h2>
<ol id="highscore-list">
 ${highScores.map(score => `<li>${score.name}: ${score.score}</li>`).join("")}
`;
}

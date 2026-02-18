// API Configuration
// Use local IP address to allow mobile access on same network
const API_BASE_URL = 'https://quiz-djvw.onrender.com';

// Quiz Questions
const quizQuestions = [
    {
        question: "What is the correct way to create a function in Python?",
        options: ["function myFunc():", "def myFunc():", "create myFunc():", "func myFunc():"],
        correct: 1
    },
    {
        question: "Which of the following is used to define a block of code in Python?",
        options: ["Curly braces {}", "Parentheses ()", "Indentation", "Square brackets []"],
        correct: 2
    },
    {
        question: "What is the output of: print(type([]))?",
        options: ["<class 'tuple'>", "<class 'list'>", "<class 'dict'>", "<class 'set'>"],
        correct: 1
    },
    {
        question: "Which keyword is used to create a class in Python?",
        options: ["class", "Class", "define", "struct"],
        correct: 0
    },
    {
        question: "What does the len() function do?",
        options: ["Returns the length of an object", "Returns the type of an object", "Returns the last element", "Returns the first element"],
        correct: 0
    },
    {
        question: "Which of these is NOT a valid Python data type?",
        options: ["int", "float", "char", "str"],
        correct: 2
    },
    {
        question: "What is the correct syntax for a for loop in Python?",
        options: ["for (i = 0; i < 10; i++)", "for i in range(10):", "foreach i in 10:", "for i = 1 to 10:"],
        correct: 1
    },
    {
        question: "Which operator is used for exponentiation in Python?",
        options: ["^", "**", "exp()", "pow"],
        correct: 1
    },
    {
        question: "What will be the output of: print(3 * 'ab')?",
        options: ["3ab", "ababab", "ab3", "Error"],
        correct: 1
    },
    {
        question: "Which method is used to add an element to the end of a list?",
        options: ["add()", "append()", "insert()", "push()"],
        correct: 1
    }
];

// State Management
let currentUser = {
    name: '',
    email: ''
};
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

// DOM Elements
const screens = {
    login: document.getElementById('login-screen'),
    quiz: document.getElementById('quiz-screen'),
    result: document.getElementById('result-screen'),
    scoreboard: document.getElementById('scoreboard-screen')
};

// Navigation Functions
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// Login Screen
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    currentUser.name = document.getElementById('name').value.trim();
    currentUser.email = document.getElementById('email').value.trim();

    if (currentUser.name && currentUser.email) {
        startQuiz();
    }
});

// Start Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    showScreen('quiz');
    displayQuestion();
}

// Display Question
function displayQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('question-counter').textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    document.getElementById('score-display').textContent = `Score: ${score}`;
    document.getElementById('question-text').textContent = question.question;

    const nextBtn = document.getElementById('next-btn');
    if (currentQuestionIndex === quizQuestions.length - 1) {
        nextBtn.innerHTML = 'See Results <span class="btn-icon">🎉</span>';
    } else {
        nextBtn.innerHTML = 'Next Question <span class="btn-icon">→</span>';
    }

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(optionDiv);
    });

    document.getElementById('next-btn').style.display = 'none';
    selectedAnswer = null;
}

// Select Answer
function selectAnswer(answerIndex) {
    if (selectedAnswer !== null) return; // Already answered

    selectedAnswer = answerIndex;
    const question = quizQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');

    options.forEach((option, index) => {
        option.classList.add('disabled');
        if (index === question.correct) {
            option.classList.add('correct');
        }
        if (index === answerIndex && answerIndex !== question.correct) {
            option.classList.add('incorrect');
        }
    });

    if (answerIndex === question.correct) {
        score++;
        document.getElementById('score-display').textContent = `Score: ${score}`;
    }

    document.getElementById('next-btn').style.display = 'block';
}

// Next Question
document.getElementById('next-btn').addEventListener('click', () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion();
    } else {
        showResults();
    }
});

// Show Results
async function showResults() {
    document.getElementById('final-score').textContent = score;

    let message = '';
    if (score === 10) {
        message = '🌟 Perfect! You are a Python Master!';
    } else if (score >= 7) {
        message = '🎯 Great job! You know your Python well!';
    } else if (score >= 5) {
        message = '👍 Good effort! Keep learning!';
    } else {
        message = '📚 Keep practicing! You\'ll get better!';
    }

    document.getElementById('result-message').textContent = message;

    // Show result screen immediately for better UX
    showScreen('result');

    // Submit score to backend in the background
    submitScore();
}

// Submit Score to Backend
async function submitScore() {
    try {
        const response = await fetch(`${API_BASE_URL}/submit-score`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: currentUser.name,
                email: currentUser.email,
                score: score
            })
        });

        if (!response.ok) {
            throw new Error('Failed to submit score');
        }

        const data = await response.json();
        console.log('Score submitted successfully:', data);
    } catch (error) {
        console.error('Error submitting score:', error);
        alert('Could not save your score. Please check if the backend server is running.');
    }
}

// View Scoreboard
document.getElementById('view-scoreboard-btn').addEventListener('click', async () => {
    showScreen('scoreboard');
    await loadScoreboard();
});

// Load Scoreboard
async function loadScoreboard() {
    const container = document.getElementById('scoreboard-container');
    container.innerHTML = '<div class="loading">Loading scoreboard...</div>';

    try {
        const response = await fetch(`${API_BASE_URL}/scoreboard`);

        if (!response.ok) {
            throw new Error('Failed to fetch scoreboard');
        }

        const scores = await response.json();

        if (scores.length === 0) {
            container.innerHTML = '<div class="loading">No scores yet. Be the first!</div>';
            return;
        }

        let tableHTML = `
            <table class="scoreboard-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
        `;

        scores.forEach((user, index) => {
            const rank = index + 1;
            const rankClass = rank <= 3 ? `rank-${rank}` : '';
            tableHTML += `
                <tr>
                    <td class="rank ${rankClass}">#${rank}</td>
                    <td>${escapeHtml(user.name)}</td>
                    <td>${escapeHtml(user.email)}</td>
                    <td><span class="score-badge">${user.score}/10</span></td>
                </tr>
            `;
        });

        tableHTML += `
                </tbody>
            </table>
        `;

        container.innerHTML = tableHTML;
    } catch (error) {
        console.error('Error loading scoreboard:', error);
        container.innerHTML = '<div class="error">Failed to load scoreboard. Please check if the backend server is running.</div>';
    }
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Back to Result
document.getElementById('back-to-result-btn').addEventListener('click', () => {
    showScreen('result');
});

// Retake Quiz
document.getElementById('retake-btn').addEventListener('click', () => {
    showScreen('login');
    document.getElementById('login-form').reset();
});

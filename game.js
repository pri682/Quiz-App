const questionElement = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull= document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3
    },
    {
        question: "How do you write 'Hi, John' in the alert box?",
        choice1: "msgBox('Hi, John');",
        choice2: "alertBox('Hi, John');",
        choice3: "msg('Hi, John');",
        choice4: "alert('Hi, John');",
        answer: 4
    },
    {
        question: "Which data structure uses LIFO (Last In, First Out) principle?",
        choice1: "Queue",
        choice2: "Stack",
        choice3: "Array",
        choice4: "Linked List",
        answer: 2
    },
    {
        question: "Which data structure uses FIFO (First In, First Out) principle?",
        choice1: "Stack",
        choice2: "Queue",
        choice3: "Array",
        choice4: "Tree",
        answer: 2
    },
    {
        question: "In which data structure can you perform fast insertions and deletions at both ends?",
        choice1: "Queue",
        choice2: "Stack",
        choice3: "Deque",
        choice4: "Array",
        answer: 3
    },
    {
        question: "Which data structure is used to implement recursion in programming languages?",
        choice1: "Queue",
        choice2: "Stack",
        choice3: "Hash Table",
        choice4: "Linked List",
        answer: 2
    },
    {
        question: "What data structure is used to represent a hierarchical relationship?",
        choice1: "Stack",
        choice2: "Queue",
        choice3: "Tree",
        choice4: "Graph",
        answer: 3
    },
    {
        question: "Which data structure allows for dynamic resizing and provides fast access to elements by index?",
        choice1: "Array",
        choice2: "Linked List",
        choice3: "Hash Table",
        choice4: "Stack",
        answer: 1
    },
    {
        question: "Which data structure is ideal for implementing a priority queue?",
        choice1: "Linked List",
        choice2: "Heap",
        choice3: "Stack",
        choice4: "Queue",
        answer: 2
    },
    {
        question: "What data structure is commonly used to perform breadth-first search (BFS)?",
        choice1: "Stack",
        choice2: "Queue",
        choice3: "Tree",
        choice4: "Graph",
        answer: 2
    },
    {
        question: "In which data structure do you store elements in a sorted manner to allow fast search?",
        choice1: "Stack",
        choice2: "Heap",
        choice3: "Binary Search Tree",
        choice4: "Queue",
        answer: 3
    }
];

const correctBonus = 10;
const maxQuestions = 12;

const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        // Go to the end page
        return window.location.assign('/end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${maxQuestions}`; // Corrected template literal

    progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    questionElement.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

const resetAnswerState = () => {
    choices.forEach(choice => {
        choice.parentElement.classList.remove('correct', 'incorrect');
    });
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        selectedChoice.parentElement.classList.add(classToApply);

        if (classToApply === 'correct') {
            score += correctBonus; // Update score if the answer is correct
            scoreText.innerText = score; // Update score display
        }

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000); // Adjust time for visual feedback
    });
});

startGame();

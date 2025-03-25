let currentQuestionIndex = 0;
let score = 0;
let questions = [];

const quizContainersEl = document.querySelector(".quiz-containers");
const quizContainerEl = document.querySelector(".quiz-container");
const quizButtonsEl = document.querySelectorAll(".quiz-btn");
const questionTextEl = document.querySelector("#question-text");
const answersContainerEl = document.querySelector("#answers");
const nextBtnEl = document.querySelector("#next-btn");
const resultContainerEl = document.querySelector("#result-container");
const resultMessageEl = document.querySelector("#result-message");

quizContainerEl.style.display = "none";
resultContainerEl.style.display = "none";

quizButtonsEl.forEach((button) => {
  button.addEventListener("click", () => {
    quizContainersEl.style.display = "none";
    quizContainerEl.style.display = "block";
    loadQuestions(button.classList[1].toLowerCase());
  });
});

async function loadQuestions(subject) {
  try {
    const response = await fetch(`questions-${subject}.json`);
    if (!response.ok) {
      throw new Error("Failed to load questions");
    }
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      alert("No questions found!");
      return;
    }
    questions = data;
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
  } catch (error) {
    alert("Error loading questions!");
  }
}

function showQuestion() {
  resetState();
  if (currentQuestionIndex >= questions.length) {
    showResults();
    return;
  }
  let currentQuestion = questions[currentQuestionIndex];
  questionTextEl.textContent = currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const answerItem = document.createElement("div");
    answerItem.className = "answer-item";
    answerItem.innerHTML = `
      <label>
        <input type="radio" name="question" value="${answer.correct}" />
        ${answer.text}
      </label>
    `;
    answerItem.onclick = () => {
      document
        .querySelectorAll(".answer-item")
        .forEach((el) => el.classList.remove("selected"));
      answerItem.classList.add("selected");
    };
    answersContainerEl.appendChild(answerItem);
  });
}

function resetState() {
  answersContainerEl.innerHTML = "";
}

nextBtnEl.addEventListener("click", () => {
  const selectedAnswer = document.querySelector(
    "input[name='question']:checked"
  );
  if (!selectedAnswer) return;
  if (selectedAnswer.value === "true") score++;
  currentQuestionIndex++;
  showQuestion();
});

function showResults() {
  quizContainerEl.style.display = "none";
  resultContainerEl.style.display = "block";
  resultMessageEl.textContent =
    score >= questions.length / 2
      ? `🎉 Congratulations! You scored ${score} out of ${questions.length}`
      : `❌ Try again! You scored ${score} out of ${questions.length}`;
}

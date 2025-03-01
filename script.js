let currentQuestionIndex = 0;
let score = 0;
let questions = [];

const quizContainers = document.querySelector(".quiz-containers");
const quizContainer = document.querySelector(".quiz-container");
const quizButtons = document.querySelectorAll(".quiz-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const resultMessage = document.getElementById("result-message");

// Hide quiz and result sections initially
quizContainer.style.display = "none";
resultContainer.style.display = "none";

// Show quiz interface when a subject is selected
quizButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const subject = button.classList[1].toLowerCase();
    console.log(`Loading questions for: ${subject}`); // Debugging
    quizContainers.style.display = "none";
    quizContainer.style.display = "block";

    loadQuestions(subject);
  });
});

// Load questions from JSON
function loadQuestions(subject) {
  fetch(`questions-${subject}.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load ${subject} questions`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Loaded questions:", data); // Debugging
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No questions found in JSON");
      }

      questions = data;
      currentQuestionIndex = 0;
      score = 0;
      showQuestion();
    })
    .catch((error) => {
      console.error("Error loading questions:", error);
      alert("Error loading questions! Check console.");
    });
}

// Show a question
function showQuestion() {
  resetState();

  if (currentQuestionIndex >= questions.length) {
    console.log("No more questions, showing results.");
    showResults();
    return;
  }

  let currentQuestion = questions[currentQuestionIndex];
  console.log("Displaying question:", currentQuestion); // Debugging

  questionText.textContent = currentQuestion.question;

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
      nextBtn.style.display = "block";
    };

    answersContainer.appendChild(answerItem);
  });
}

// Reset previous question
function resetState() {
  answersContainer.innerHTML = "";
  nextBtn.style.display = "none";
}

// Move to next question
nextBtn.onclick = () => {
  const selectedAnswer = document.querySelector(
    "input[name='question']:checked"
  );

  if (!selectedAnswer) {
    console.log("No answer selected, waiting...");
    return;
  }

  if (selectedAnswer.value === "true") {
    score++;
  }

  currentQuestionIndex++;

  showQuestion();
};

// Show final results
function showResults() {
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";

  resultMessage.textContent =
    score >= questions.length / 2
      ? `🎉 Congratulations! You scored ${score} out of ${questions.length}`
      : `❌ Try again! You scored ${score} out of ${questions.length}`;
}

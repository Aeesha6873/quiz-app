const htmlButtonEl = document.querySelector(".html");
const cssButtonEl = document.querySelector(".css");
const javascriptButtonEl = document.querySelector(".js");
const quizContainerEl = document.querySelector(".quiz-container");
const htmlQuizTemplateEl = document.querySelector(".html-quiz-template");
const cssQuizTemplateEl = document.querySelector(".css-quiz-template");
const javascriptQuizTemplateEl = document.querySelector(
  ".javascript-quiz-template"
);

htmlButtonEl.addEventListener("click", () => {
  const clonedQuiz = htmlQuizTemplateEl.content.cloneNode(true);
  quizContainerEl.replaceWith(clonedQuiz);
});

cssButtonEl.addEventListener("click", () => {
  const clonedQuiz = cssQuizTemplateEl.content.cloneNode(true);
  quizContainerEl.replaceWith(clonedQuiz);
});

javascriptButtonEl.addEventListener("click", () => {
  const clonedQuiz = javascriptQuizTemplateEl.content.cloneNode(true);
  quizContainerEl.replaceWith(clonedQuiz);
  initializeJavaScriptQuiz(); // Call the function to add quiz logic
});

// Function to initialize JavaScript quiz logic
function initializeJavaScriptQuiz() {
  const form = document.querySelector(".form");
  const answers = Array.from(document.querySelectorAll(".answer"));
  const questionItems = document.querySelectorAll(".question-item");
  const alertBox = document.getElementById("alert");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let allCorrect = true; // Track if all questions are correct

    questionItems.forEach((questionItem) => {
      const selectedAnswer = questionItem.querySelector(".answer:checked");

      if (!selectedAnswer) {
        allCorrect = false; // If a question is unanswered, set false
        return;
      }

      const isCorrect = selectedAnswer.value === "true";

      if (isCorrect) {
        questionItem.classList.add("correct");
        questionItem.classList.remove("incorrect");
      } else {
        questionItem.classList.add("incorrect");
        questionItem.classList.remove("correct");
        allCorrect = false; // If any answer is wrong, set false
      }
    });

    // Show the "Congratulations" alert only if all answers are correct
    if (allCorrect) {
      alertBox.classList.add("active");
      setTimeout(() => {
        alertBox.classList.remove("active");
      }, 2000);
    }
  });
}

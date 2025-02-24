// const form = document.querySelector(".form");
// const answers = Array.from(document.querySelectorAll(".answer"));
// const questionItems = document.querySelectorAll(".question-item");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   questionItems.forEach((questionItem) => {
//     questionItem.classList.add("incorrect");
//     questionItem.classList.remove("correct");
//   });

//   const checkedAnswers = answers.filter((answer) => answer.checked);

//   checkedAnswers.forEach((answer) => {
//     const isCorrect = answer.value === "true";
//     const questionItem = answer.closest(".question-item");

//     if (isCorrect) {
//       questionItem.classList.add("correct");
//       questionItem.classList.remove("incorrect");
//     } else {
//       questionItem.classList.add("incorrect");
//       questionItem.classList.remove("correct");
//     }

//     const allTrue = checkedAnswers.every((answer) => answer.value === "true");
//     const allAnswered = checkedAnswers.length === questionItems.length;

//     if (allTrue && allAnswered) {
//       alert.classList.add("active");
//       setTimeout(() => {
//         alert.classList.remove("active");
//       }, 1000);
//     }
//   });
// });

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

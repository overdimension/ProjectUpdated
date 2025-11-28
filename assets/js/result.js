const scoreElem = document.getElementById("score");
const score = localStorage.getItem("quizScore") || 0;
const total = localStorage.getItem("quizTotal") || 0;

scoreElem.textContent = `${score} / ${total}`;

document.getElementById("homeBtn").addEventListener("click", () => {
    window.location.href = "index.html";
});

document.querySelectorAll(".quiz-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const quiz = btn.dataset.quiz;
        window.location.href = `quiz.html?quiz=${quiz}`;
    });
});

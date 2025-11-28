let questions = []; 
let current = 0;

let question = document.getElementById("question");
let answers = document.getElementById("answers");
let next = document.getElementById("next");
let menuItems = document.querySelectorAll("aside li");

function loadQuiz() {
    let params = new URLSearchParams(window.location.search);
    let quizNumber = params.get("quiz") || "1";

    fetch("quizzes.json")
        .then(res => res.json())
        .then(data => {
            let quizName = "quiz" + quizNumber;
            questions = data[quizName];

            if (!questions) {
                question.innerText = "Вікторину не знайдено";
                return;
            }

            showQuestion();
        })
        .catch(err => {
            question.innerText = "Помилка завантаження";
            console.log(err);
        });
}

function showQuestion() {
    let q = questions[current];
    question.innerText = q.text;
    answers.innerHTML = "";

    for (let i = 0; i < q.options.length; i++) {
        let btn = document.createElement("button");
        btn.innerText = q.options[i];
        btn.onclick = function() {
            if (i === q.correct) {
                btn.style.background = "lightgreen";
            } else {
                btn.style.background = "lightcoral";
            }

            let all = answers.querySelectorAll("button");
            for (let b of all) b.disabled = true;
        };
        answers.appendChild(btn);
    }

    updateMenu();
}

function updateMenu() {
    menuItems.forEach((item, index) => {
        if (index === current) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
}

next.onclick = function() {
    current++;
    if (current >= questions.length) {
        current = 0;
    }
    showQuestion();
};

menuItems.forEach((item, index) => {
    item.onclick = function() {
        current = index;
        showQuestion();
    };
});

loadQuiz(); 

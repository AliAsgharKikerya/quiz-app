import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDupQ_DB8C99v1eTF-x99UaXCW274YJ880",
    authDomain: "fir-hosting-dbc1c.firebaseapp.com",
    databaseURL: "https://fir-hosting-dbc1c-default-rtdb.firebaseio.com",
    projectId: "fir-hosting-dbc1c",
    storageBucket: "fir-hosting-dbc1c.appspot.com",
    messagingSenderId: "120347394450",
    appId: "1:120347394450:web:3f78a26703a1926ac0414b",
    measurementId: "G-Z91EQRLSQD"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase()
const reference = ref(database, '/QUIZ')
onValue(reference, function (val) {
    var score = 0
    let questions = val.val()
    let quizForm = document.getElementById('quizForm')
    quizForm.innerHTML = ""
    for (var index = 0; index < questions.length; index++) {
        var question = questions[index]
        quizForm.innerHTML += `<div class="form-group">
            <label for= "question9"> Question ${index + 1}: ${question.question} </label><br/>
                <label class="radio-inline"><input type="radio" name="question${index + 1}" value="${question.options[0]}"/>${question.options[0]}</label>
                <label class="radio-inline"><input type="radio" name="question${index + 1}" value="${question.options[1]}"/>${question.options[1]}</label>
                <label class="radio-inline"><input type="radio" name="question${index + 1}" value="${question.options[2]}"/>${question.options[2]}</label>
            </div>`
    }
    quizForm.innerHTML += `<button type="submit" class="btn btn-primary">Submit</button>`

    console.log(questions)
    document.getElementById("quizForm").addEventListener("submit", function (e) {
        e.preventDefault();
        for (var index = 0; index < questions.length; index++) {
            var question = questions[index]
            var answer = document.querySelector(`input[name="question${index + 1}"]:checked`)?.value;
            if (answer === question.correct) score++;
        }
        var resultDiv = document.getElementById("result");
        resultDiv.innerHTML = "<h3>Quiz Result</h3>";
        resultDiv.innerHTML += `<p>Your score is: ${score}/${questions.length}</p>`;
    });
})
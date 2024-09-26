const questions = [
    {
        question: "Какой язык работает в браузере?",
        answers: ["Java", "C", "Python", "JavaScript"],
        correct: 4
    },
    {
        question: "Что озночает CSS?",
        answers: [
            "Central Style Sheets",
            "Cascading Style Sheets",
            "Cascading Simple Sheets ",
            "Cars SUVs Sailboards"
        ],
        correct: 2
    },
    {
       question: "Что озночает HTML?",
       answers: [
        "Hypertext Markup Language",
        "Hypertext Markdown Language",
        "Hypertext Machine Language",
        "Helicopters Terminals Motorboard Lamborginis"
       ],
       correct: 1 
    },
    {
        question: "В каком году был создан JavaScript?",
        answers: ["1996", "1995", "1994", "все ответы не верны"],
        correct: 2
    }
]

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

//Переменные игры
let score = 0;
let questionIndex = 0;

clearePage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearePage(){
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
}

function checkAnswer(){
    //Находим выбранную радио кнопку
    const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')
    //Если ответ не выбран - ничего не делаем, выходим из функции
    if (!checkedRadio){
        submitBtn.blur();
        return
    }

    //Узнаем номер ответа пользователя

    const userAnswer = parseInt(checkedRadio.value)

    //Если ответ верен - увеличиваем счёт

    if (userAnswer === questions[questionIndex]['correct']){
        score++;
    }

    if (questionIndex === questions.length - 1){
       clearePage();
       showResults();  
    }else{
       questionIndex++
       clearePage();
       showQuestion();
    }

}

function showResults(){
    const resultsTemplate = `
        <h2 class="title">%title%</h2>
        <h3 class="summary">%message%</h3>
        <p class="result">%result%</p>
        `;

    let title, message;
    //Варианты загаловков и текста
    if (score === questions.length){
        title = "Вы победили!";
        message = "Вы ответили верно на все вопросы!";
    } else if ((score * 100) / questions.length >= 50){
        title = "Средний результат!";
        message = "Вы дали более половины верных ответов!";
    } else {
        title = "Слабый результат!";
        message = "Вы дали меньше половины верных ответов!";    
    }

    //Результат
    let result = `${score} из ${questions.length}`;

    //Финальный ответ, вставляем данные в шаблон
    const finalMessage = resultsTemplate.replace('%title%', title)
                                        .replace('%message%', message)
                                        .replace('%result%', result)

    headerContainer.innerHTML = finalMessage;
    
    //Меняем кнопку на "Начать заново"
    submitBtn.blur();
    submitBtn.innerText = "Начать заново";
    submitBtn.onclick = function () {
        history.go()
    }
}

function showQuestion(){

//Вопрос
const headerTemplate = `<h2 class="title">%title%</h2>`;
const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
headerContainer.innerHTML = title;

//Варианты ответов
let answerNumber = 1;
for (answerText of questions[questionIndex]['answers']){
    
    const questionTemplate = `\
        <li>
            <lebel>
                <input value="%number%" type="radio" class="answer" name="answer">
                <span>%answer%</span>
            </lebel>
        </li>
        `;

        let answerHTML = questionTemplate.replace('%answer%', answerText).replace('%number%', answerNumber)
        listContainer.innerHTML += answerHTML;
        answerNumber++;
}

}
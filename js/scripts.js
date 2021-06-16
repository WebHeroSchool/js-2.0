const slides = document.querySelectorAll('.question');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const start = document.querySelector('.start-btn');
const restart = document.querySelector('.restart');
const container = document.querySelector('.container');
const form = document.querySelector('.form');
const formName = document.querySelector('.form__name');
const buttonName = document.querySelector('.form__btn');
const counterAnswers = document.getElementById('counterAnswers');
const regex = /(^[A-Z]{1}[a-z]{1,9}( )?$)|(^[А-Я]{1}[а-я]{1,9}( )?$)/;
let countSlide = 0;
let countAnswers = 0;
let timerShowQuestion;
let timerCheckQuestion;

start.addEventListener("click", () => {
  start.classList.add('none');
  next.classList.remove('none');
  previous.classList.remove('none');
  switchQuestion(countAnswers);
  console.log(countSlide + 1);
})

let assignHandler = () => {
  Array.from(container.querySelectorAll('.question .question__answers'))
    .forEach(answers => {
      answers.addEventListener("click", checkResult);
    })
}

assignHandler();

function checkResult(event) {
  let target = event.target;
  if (target.tagName != 'LABEL') return;

  disableButton(event);

  const correctAnswers = ['В Африке', '55 км/ч', '9', '30 лет'];
  let answer = target.previousElementSibling.value;
  let isCorrect = correctAnswers.includes(answer);
  if (isCorrect) {
    target.style.background = "green";
    countAnswers++;
  } else {
    target.style.background = "red";
  }

  event.currentTarget.removeEventListener("click", checkResult);

  clearTimeout(timerShowQuestion);

  timerCheckQuestion = setTimeout(switchNextQuestion, 1500);
}

function disableButton(event) {
  if (event) {
    const button = event.currentTarget.querySelectorAll('.radio');
    button.forEach(item => item.setAttribute("disabled", "disabled"));
  } else {
    const disableBtn = slides[countSlide].querySelectorAll('.radio');
    Array.from(disableBtn).forEach(item => item.setAttribute("disabled", "disabled"));
    const disableAnswers = slides[countSlide].querySelector('.question__answers');
    disableAnswers.removeEventListener("click", checkResult);
  }
}

next.addEventListener("click", switchNextQuestion);

function switchNextQuestion() {
  if (countSlide === 2) {
    next.textContent = 'check';
  }

  if (countSlide === 3) {
    next.classList.add('none');
    previous.classList.add('none');
  }

  if (countSlide === 4) return;

  switchQuestion(countSlide + 1);
  countSlide++;
  console.log(countSlide + 1);
  clearTimeout(timerCheckQuestion);
}

previous.addEventListener("click", switchPreviousQuestion);

function switchPreviousQuestion() {
  if (countSlide <= 0) {
    return;
  }

  if (countSlide != 2) {
    next.textContent = 'next';
  }

  switchQuestion(countSlide - 1);
  countSlide--;
  console.log(countSlide + 1);
}

function switchQuestion(switchedSlide) {
  slides[countSlide].classList.remove('active');
  slides[switchedSlide].classList.add('active');

  if (timerShowQuestion !== null) clearTimeout(timerShowQuestion);
  if (countSlide !== 3) {
    timerShowQuestion = setTimeout(() => {
      disableButton();
      switchNextQuestion();
    }, 10000);
  }
}

buttonName.addEventListener("click", () => {
  let name = formName.value;
  let err = document.createElement('p');
  if (!regex.test(name)) {
    err.classList.add('error');
    err.textContent = 'Введите корректное имя(содержит 2-10 символов и начинается с заглавной буквы)';
    form.append(err);
  } else {
    slides[4].classList.remove('active');
    showResult(name);
    restart.classList.remove('none');
  }
   setTimeout(() => err.remove(), 2000);
   formName.value = null;
});

function showResult(name) {
  counterAnswers.classList.remove('none');
  counterAnswers.innerHTML = `Число правильных ответов игрока ${name} ${countAnswers}`;
}

restart.addEventListener("click", () => {
  restart.classList.add('none');
  counterAnswers.classList.add('none');
  start.classList.remove('none');
  countSlide = 0;
  countAnswers = 0;
  assignHandler();
  activeButton();
});

function activeButton() {
  const radio = container.querySelectorAll('.radio');
  Array.from(radio).forEach(item => item.removeAttribute('disabled'));

  const label = container.querySelectorAll('.answer');
  Array.from(label).forEach(item => item.style.background = '#ffff2b');
}

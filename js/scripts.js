const slides = document.querySelectorAll('.question');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const start = document.querySelector('.start-btn');
const container = document.querySelector('.container');
const form = document.querySelector('.form');
const formName = document.querySelector('.form__name');
const buttonName = document.querySelector('.form__btn');
const regex = /(^[A-Z]{1}[a-z]{1,9}( )?$)|(^[А-Я]{1}[а-я]{1,9}( )?$)/;
let countSlide = 0;
let countAnswers = 0;

start.addEventListener("click", () => {
  start.classList.add('none');
  next.classList.remove('none');
  previous.classList.remove('none');
  slides[0].classList.add('active');
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

  const button = event.currentTarget.querySelectorAll('.radio');
  button.forEach(item => item.setAttribute("disabled", "disabled"));

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
}

next.addEventListener("click", () => {
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
})

previous.addEventListener("click", () => {
  if (countSlide <= 0) {
    return;
  }
  if (countSlide != 2) {
    next.textContent = 'next';
  }
  switchQuestion(countSlide - 1);
  countSlide--;
  console.log(countSlide + 1);
})

function switchQuestion(switchedSlide) {
  slides[countSlide].classList.remove('active');
  slides[switchedSlide].classList.add('active');
}

buttonName.addEventListener("click", function(event) {
  let name = formName.value;
  if (!regex.test(name)) {
    let err = document.createElement('p');
    err.classList.add('error');
    err.textContent = 'Введите корректное имя(содержит 2-10 символов и начинается с заглавной буквы)';
    form.append(err);
    name = '';
  } else {
    slides[4].classList.remove('active');
    showResult(name);
  }
})

function showResult(name) {
  let counterAnswers = document.getElementById('counterAnswers');
  counterAnswers.innerHTML = `Число правильных ответов игрока ${name} ${countAnswers}`;
}

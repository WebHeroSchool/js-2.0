const questionOne = {
  question: 'Где обитает жираф?',
  answer: {
    a: 'В Индии',
    b: 'В Америке',
    c: 'В Африке',
    d: 'В Австралии'
  },
  currectAnswer: 'В Африке'
};
const questionTwo = {
  question: 'Как быстро может бегать жираф?',
  answer: {
    a: '70 км/ч',
    b: '55 км/ч',
    c: '30 км/ч',
    d: '100 км/ч'
  },
  currectAnswer: '55 км/ч'
};
const questionThree = {
  question: 'Сколько подвидов жирафа существует?',
  answer: {
    a: 9,
    b: 7,
    c: 10,
    d: 17
  },
  currectAnswer: 9
};
const questionFour = {
  question: 'Сколько живет жираф?',
  answer: {
    a: '50 лет',
    b: '90 лет',
    c: '30 лет',
    d: '70 лет'
  },
  currectAnswer: '30 лет'
};

const questions = [questionOne, questionTwo, questionThree, questionFour];
const userAnswer = ['В Африке', '30 км/ч', 9, '50 лет'];
let num = 0;

//Задание прошлого урока

/* questions.map(obj => {
  if (obj.currectAnswer === obj.answer.c) {
    console.log(obj.currectAnswer);
  }
});
 */

function checkAnswer(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === questions[i].currectAnswer) {
      num++;
    }
  }

  let q = document.getElementById('question');
  q.innerHTML = `Число правильных ответов ${num}`;
}

checkAnswer(userAnswer);

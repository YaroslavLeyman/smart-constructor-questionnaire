/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import styles from './QuizOne.module.scss';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'язык программирования', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
];

function OneResult({ correct, onRestart }) {
  const happyImageUrl = "https://cdn-icons-png.flaticon.com/512/2278/2278992.png";
  const sadImageUrl = "https://cdn-icons-png.flaticon.com/512/4570/4570641.png";

  const imageToDisplay = correct === questions.length ? happyImageUrl : sadImageUrl;

  return (
    <div className={styles.result}>
      <img className={styles.img} src={imageToDisplay} />
      <h2 className={styles.titleResult}>Вы отгадали {correct} ответа из {questions.length}</h2>
      <button className={styles.buttonResult} onClick={onRestart}>Попробовать снова</button>
    </div>
  );
}


function OneGame({ step, question, onClickVariant }) {

  const percentage = Math.round((step / question.variants.length) * 100);

  return (
    <>
      <div className={styles.progress}>
        <div style={{ width: `${percentage}%` }} className={styles.progress__inner}></div>
      </div>
      <h2 className={styles.titleGame}>{question.title}</h2>
      <ul className={styles.groupQuestions}>
        {question.variants.map((text, index) => (
          <li className={styles.questionItems} onClick={() => onClickVariant(index)} key={text}>{text}</li>
        ))}
      </ul>
    </>
  );
}

function QuizOne({ questions }) {

  const [step, setStep] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);

  const question = questions[step];

  const onClickVariant = (index) => {
    console.log(step, index);
    setStep(step + 1);

    if (index === question.correct) {
      setCorrect(correct + 1);
    }
  }

  const onRestart = () => {
    setStep(0);
    setCorrect(0);
  }

  return (
    <div className={styles.container}>
      {
        step !== questions.length ? (
          <OneGame step={step} question={question} onClickVariant={onClickVariant} />
        ) : (
          <OneResult correct={correct} onRestart={onRestart} />
        )
      }
    </div>
  );
}

export default QuizOne;
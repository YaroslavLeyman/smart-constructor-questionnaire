import React from 'react';
import styles from './QuizGame.module.scss';

function QuizGame({ step, questionData, onClickVariant, totalQuestions }) {
  if (!questionData) {
    return <div>Загрузка...</div>;
  }

  const percentage = Math.round((step / totalQuestions) * 100);

  return (
    <>
      <div className={styles.progress}>
        <div
          style={{ width: `${percentage}%` }}
          className={styles.progressInner}
        ></div>
      </div>
      <h2 className={styles.quizGameTitle}>{questionData.text}</h2>
      <ul className={styles.quizGameAnswers}>
        {questionData.answers.map((answer, index) => (
          <li onClick={() => onClickVariant(index)} key={answer.text}>
            {answer.text}
          </li>
        ))}
      </ul>
    </>
  );
}

export default QuizGame;








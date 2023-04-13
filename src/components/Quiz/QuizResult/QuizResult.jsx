import React from 'react';
import styles from './QuizResult.module.scss';

function QuizResult({ correct, totalQuestions }) {
  return (
    <div className={styles.result}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png"
        alt="поздравляем"
      />
      <h2>
        Вы отгадали {correct} ответа из {totalQuestions}
      </h2>
      <a href="/">
        <button>Попробовать снова</button>
      </a>
    </div>
  );
}

export default QuizResult;



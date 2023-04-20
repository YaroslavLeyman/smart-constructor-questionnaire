import React from "react";
import styles from "./QuizResult.module.scss";

function QuizResult({ correct, totalQuestions, resultsSettings = {}, onRetry }) {
  const { title, description, showRetryButton } = resultsSettings;

  const imageUrl =
    correct === totalQuestions
      ? "https://cdn-icons-png.flaticon.com/512/2278/2278992.png"
      : "https://cdn-icons-png.flaticon.com/512/4570/4570641.png";

  return (
    <div className={styles.result}>
      <img src={imageUrl} alt="результат" />
      <h3>
        Вы отгадали {correct} ответа из {totalQuestions}
      </h3>
      <h3>{title}</h3>
      <p>{description}</p>
      {showRetryButton && <button onClick={onRetry}>Попробовать снова</button>}
    </div>
  );
}

export default QuizResult;





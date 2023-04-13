import React from 'react';
import styles from './Quiz.module.scss';
import QuizGame from './QuizGame/QuizGame';
import QuizResult from './QuizResult/QuizResult';
import { useSelector } from 'react-redux';

function Quiz() {
  const currentQuizIndex = useSelector((state) => state.quiz.currentQuizIndex);
  const questions = useSelector(
    (state) => state.quiz.quizzes[currentQuizIndex]?.questions || []
  );
  const [step, setStep] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);

  const questionData = questions[step];

  const onClickVariant = (index) => {
    setStep(step + 1);

    if (questionData.answers[index].isCorrect) {
      setCorrect(correct + 1);
    }
  };

  return (
    <div className={styles.container}>
      {step !== questions.length ? (
        <QuizGame
          step={step}
          questionData={questionData}
          onClickVariant={onClickVariant}
          totalQuestions={questions.length}
        />
      ) : (
        <QuizResult correct={correct} totalQuestions={questions.length} />
      )}
    </div>
  );
}

export default Quiz;




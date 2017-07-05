import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';

const style = {
  margin: 15,
}

const QuizProgress = ({ correctAnswerStack, quizLength }) => (
  <LinearProgress 
    mode="determinate"
    style={style} 
    value={correctAnswerStack.length} 
    max={quizLength} 
  />
);

export default QuizProgress;

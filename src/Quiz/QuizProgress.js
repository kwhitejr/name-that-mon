import React from 'react';
import PropTypes from 'prop-types'; 
import LinearProgress from 'material-ui/LinearProgress';

const style = {
  marginTop: 15,
  marginBottom: 15,
}

const QuizProgress = ({ correctAnswerStack, quizLength }) => (
  <div>
    <LinearProgress 
      mode="determinate"
      style={style} 
      value={correctAnswerStack.length} 
      max={quizLength} 
    />
  </div>
);

QuizProgress.propTypes = {
  correctAnswerStack: PropTypes.array,
  quizLength: PropTypes.number,
};

export default QuizProgress;

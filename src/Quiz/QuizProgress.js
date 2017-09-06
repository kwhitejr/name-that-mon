import React from 'react';
import PropTypes from 'prop-types'; 
import LinearProgress from 'material-ui/LinearProgress';

const style = {
  marginTop: 15,
  marginBottom: 15,
  // marginLeft: 15,
  // marginRight: 15,
}

export const QuizProgress = ({ answerStack, quizLength }) => (
  <div>
    <LinearProgress 
      mode="determinate"
      style={style} 
      value={answerStack.length} 
      max={quizLength}
      color="#f00000" 
    />
  </div>
);

QuizProgress.propTypes = {
  answerStack: PropTypes.array,
  quizLength: PropTypes.number,
};

export default QuizProgress;

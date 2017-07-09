import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'

// For simple styles, no need for separate CSS file
const styles = {
  raisedButton: {
    margin: 6,
  },
};

const ResultsTable = ({ resetThenHome, resetThenRestart }) => (
  <div>
    <RaisedButton 
      label="Home"
      primary={true}
      // disabled={!isAnswerSelected}
      style={styles.raisedButton}
      onTouchTap={resetThenHome}
    />
    <RaisedButton 
      label="Restart"
      secondary={true}
      // disabled={!isAnswerSubmitted}
      style={styles.raisedButton}
      onTouchTap={resetThenRestart}
    />
  </div>
)

export default ResultsTable;

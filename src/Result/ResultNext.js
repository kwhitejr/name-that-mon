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
      style={styles.raisedButton}
      onTouchTap={resetThenHome}
    />
  </div>
)

export default ResultsTable;

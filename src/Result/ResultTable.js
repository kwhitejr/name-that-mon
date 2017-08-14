import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment' 
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

const styles = {
  table: {
    "fontSmooth": "never",
    "WebkitFontSmoothing": "none",
    "fontFamily": "'pokemon-font', monospace", 
    "fontSize": "20px",
    color: "black",
  },
}

const ResultTable = ({ correctAnswerStack, lastCorrectAnswer, wrongAnswer, quizTotalTime }) => (
  <Table selectable={false} style={styles.table}>
    <TableBody displayRowCheckbox={false} >
      <TableRow>
        <TableRowColumn>Ended On</TableRowColumn>
        <TableRowColumn>{wrongAnswer.name}</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>Answer Streak</TableRowColumn>
        <TableRowColumn>{correctAnswerStack.length}</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>Total Quiz Time</TableRowColumn>
        <TableRowColumn>{moment(quizTotalTime).format("mm:ss.SS")}</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>Avg Answer Time</TableRowColumn>
        <TableRowColumn>{moment(quizTotalTime/correctAnswerStack.length).format("mm:ss.SS")}</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
)

ResultTable.propTypes = {
  wrongAnswer: PropTypes.object,
  correctAnswerStack: PropTypes.array,
  quizTotalTime: PropTypes.number,
};

export default ResultTable;

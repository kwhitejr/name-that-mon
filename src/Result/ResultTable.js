import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

const ResultsTable = ({ correctAnswerStack, lastCorrectAnswer, endedOn, quizTotalTime }) => (
  <Table selectable={false} >
    <TableBody displayRowCheckbox={false} >
      <TableRow>
        <TableRowColumn>Ended On</TableRowColumn>
        <TableRowColumn>{endedOn.name}</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>Answer Streak</TableRowColumn>
        <TableRowColumn>{correctAnswerStack.length}</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>Total Quiz Time</TableRowColumn>
        <TableRowColumn>{quizTotalTime}</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>Avg Answer Time</TableRowColumn>
        <TableRowColumn>{}</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
)

export default ResultsTable;

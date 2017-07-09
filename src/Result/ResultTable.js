import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

const ResultsTable = ({ correctAnswerStack, lastCorrectAnswer, endedOn }) => (
  <Table selectable={false} >
    <TableBody displayRowCheckbox={false} >
      <TableRow>
        <TableRowColumn>Answer Streak</TableRowColumn>
        <TableRowColumn>{correctAnswerStack.length}</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>Ended On</TableRowColumn>
        <TableRowColumn>{endedOn}</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>Last Correct Answer</TableRowColumn>
        <TableRowColumn>{lastCorrectAnswer}</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
)

export default ResultsTable;

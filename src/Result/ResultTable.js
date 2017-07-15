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
        <TableRowColumn>Ended On</TableRowColumn>
        <TableRowColumn>{endedOn.name}</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>Answer Streak</TableRowColumn>
        <TableRowColumn>{correctAnswerStack.length}</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>Total Time</TableRowColumn>
        <TableRowColumn>{null}</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>Avg Time Per Answer</TableRowColumn>
        <TableRowColumn>{null}</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
)

export default ResultsTable;

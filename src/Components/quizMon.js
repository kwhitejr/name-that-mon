import React, { Component } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import { Grid, Row, Col } from 'react-flexbox-grid';

import pokemon from '../assets/pokemon/1.png';

const QuizMon = () => (
  <GridList>
    <GridTile
      key={pokemon}
      title="Name That Mon"
    >
      <img src={pokemon} className="mask" alt="Name that Mon" />
    </GridTile>
  </GridList>
)

export default QuizMon;
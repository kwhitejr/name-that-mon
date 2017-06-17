import React, { Component } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import { Grid, Row, Col } from 'react-flexbox-grid';

import pokemon from '../assets/pokemon/1.png';

const QuizMon = () => (
  <Grid>
    <Row>
      <Col xs={12} >
        <GridList>
          <GridTile
            key={pokemon}
            title="Name That Mon"
          >
            <img src={pokemon} className="mask" alt="logo" />
          </GridTile>
        </GridList>
      </Col>
    </Row>
  </Grid>
)

export default QuizMon;
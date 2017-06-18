import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import HelpOutline from 'material-ui/svg-icons/action/help-outline'
import pokemon from '../assets/pokemon/1.png';

const styles = {
  gridTile: {
    backgroundColor: "gray",
  }
}

const QuizMon = () => (
  <Grid>
    <Row>
      <Col xs={12}>
        <GridList>
          <GridTile
            key={pokemon}
            actionIcon={<IconButton><HelpOutline color="white" /></IconButton>}
            actionPosition="right"
            title="Name That Mon!"
            titlePosition="top"
            titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            style={styles.gridTile}
          >
            <img src={pokemon} id="target-mon" className="mask" alt="Name that Mon"/>
          </GridTile>
        </GridList>
      </Col>
    </Row>
  </Grid>
)

export default QuizMon;
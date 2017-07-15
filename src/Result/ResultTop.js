import React, { Component } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';

const styles = {
  gridTile: {
    backgroundColor: "gray",
    // height: 200,
    width: 200,
  }
}

const ResultTop = ({endedOn}) => (
  <div className="top">
    <GridList>
      <GridTile
        key={endedOn.id}
        actionPosition="right"
        title="Mon, you are done!"
        titlePosition="top"
        titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        style={styles.gridTile}
      >
        <img 
          src={require(`../assets/pokemon/${endedOn.id}.png`)} 
          id="target-mon" 
          className="grayscale" 
          alt="Name that Mon" 
        />
      </GridTile>
    </GridList>
  </div>
)


export default ResultTop;
import React from 'react';
import PropTypes from 'prop-types'; 
import { GridList, GridTile } from 'material-ui/GridList';

const styles = {
  gridTile: {
    backgroundColor: "gray",
    // height: "50%",
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    // color: "black",
  }
}

const ResultTop = ({ wrongAnswer }) => (
  <div className="top">
    <GridList
      cols={1}
      cellHeight={200}
    >
      <GridTile
        key={wrongAnswer.id}
        actionPosition="right"
        title="Mon, you are done!"
        titlePosition="top"
        titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        style={styles.gridTile}
      >
        <img 
          src={require(`../assets/pokemon/${wrongAnswer.id}.png`)} 
          id="target-mon" 
          className="grayscale" 
          alt="Name that Mon" 
        />
      </GridTile>
    </GridList>
  </div>
)

ResultTop.propTypes = {
  wrongAnswer: PropTypes.object,
};

export default ResultTop;

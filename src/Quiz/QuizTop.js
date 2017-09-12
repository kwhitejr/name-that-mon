import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { GridList, GridTile } from 'material-ui/GridList';

import IconButton from 'material-ui/IconButton';
import HelpOutline from 'material-ui/svg-icons/action/help-outline';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const styles = {
  gridTile: {
    backgroundColor: "gray",
    // height: "50%",
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    // color: "black",
  },
  gridList: {

  },
}

class QuizTop extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
    // isClueUsed: false,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({dialogOpen: true});
    this.props.useClue()
  };

  handleClose() {
    this.setState({dialogOpen: false});
  };

  render() {
    const { currentMon } = this.props

    // image src requires dynamic import
    let imgUrl = require(`../assets/pokemon/${currentMon.id}.png`)

    const actions = [
      <FlatButton
        label="Back"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div className="top">
        <GridList
          cols={1}
          cellHeight={200}
        >
          <GridTile
            key={currentMon.id}
            actionIcon={<IconButton onTouchTap={this.handleOpen}><HelpOutline color="white" /></IconButton>}
            actionPosition="right"
            title="Who dis?"
            titlePosition="top"
            titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            style={styles.gridTile}
          >
            <img 
              src={imgUrl} 
              id="target-mon" 
              className="mask" 
              alt="Name that Mon"
            />
          </GridTile>
        </GridList>
        <Dialog
          title="Clue!"
          actions={actions}
          modal={true}
          open={this.state.dialogOpen}
        >
          {`This pokemon's type: ${currentMon.type1.toUpperCase()}.`}
        </Dialog>
      </div>
    )
  }
}

QuizTop.propTypes = {
  currentMon: PropTypes.object,
  useClue: PropTypes.func,
};

export default QuizTop;
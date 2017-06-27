import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import HelpOutline from 'material-ui/svg-icons/action/help-outline';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const styles = {
  gridTile: {
    backgroundColor: "gray",
  }
}

class QuizMon extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const { currentMon, correctAnswerStack } = this.props

    // image src requires dynamic import
    const imgUrl = require(`../assets/pokemon/${currentMon.index}.png`)

    const actions = [
      <FlatButton
        label="Back"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
    <Grid>
      <Row>
        <Col xs={12}>
          <GridList>
            <GridTile
              key={imgUrl}
              actionIcon={<IconButton onTouchTap={this.handleOpen}><HelpOutline color="white" /></IconButton>}
              actionPosition="right"
              title="Name That Mon!"
              titlePosition="top"
              titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
              style={styles.gridTile}
            >
              <img src={imgUrl} id="target-mon" className="mask" alt="Name that Mon"/>
            </GridTile>
          </GridList>
          <p>Answer Streak: {correctAnswerStack.length}</p>
          <Dialog
            title="Clue!"
            actions={actions}
            modal={true}
            open={this.state.open}
          >
            {currentMon.clue}
          </Dialog>
        </Col>
      </Row>
    </Grid>
    )
  }
}

export default QuizMon;
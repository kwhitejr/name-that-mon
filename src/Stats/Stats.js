import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import { 
  getRightiest,
  getWrongiest,
  getHighScore,
  getTotalPlaythrus,
} from './StatsActions'

import './Stats.css';

export class Stats extends Component {

  componentWillMount() {
    this.props.getRightiest()
    this.props.getWrongiest()
    this.props.getHighScore()
    this.props.getTotalPlaythrus()
  }

  render() {
    return (
      <div className="view-container">      
        <StatsList {...this.props} />
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  wrongiest:  state.stats.wrongiest,
  rightiest:  state.stats.rightiest,
  highScore:  state.stats.highScore,
  totalPlaythrus:  state.stats.totalPlaythrus,
});

const mapDispatchToProps = (dispatch) => ({
  getRightiest: () => dispatch(getRightiest()),
  getWrongiest: () => dispatch(getWrongiest()),
  getHighScore: () => dispatch(getHighScore()),
  getTotalPlaythrus: () => dispatch(getTotalPlaythrus()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stats);

const styles = {
  subheader: {
    "fontSmooth": "never",
    "WebkitFontSmoothing": "none",
    "fontFamily": "'pokemon-font', monospace", 
    "fontSize": "30px",
    color: "black",
  },
  listitem: {
    "fontSmooth": "never",
    "WebkitFontSmoothing": "none",
    "fontFamily": "'pokemon-font', monospace", 
    "fontSize": "20px",
    color: "black",
  }
}

const StatsList = ({rightiest, wrongiest, highScore, totalPlaythrus}) => (
  <List>
    <Subheader style={styles.subheader}>Some Facts, Mon!</Subheader>
    <Divider />
    <ListItem
      style={styles.listitem}
      leftIcon={<i className="fa fa-users fa-2x" aria-hidden="true"></i>}
      primaryText="Concurrent Mon Namers"
      secondaryText={54321}
    />
    <Divider />
    <ListItem
      style={styles.listitem}
      leftIcon={<i className="fa fa-line-chart fa-2x" aria-hidden="true"></i>}
      primaryText={`High Score: ${highScore.userInitials}`}
      secondaryText={`Named ${highScore.correctAnswerStack.length} Mon on ${moment.unix(highScore.endTime/1000).format("MMMM DD, YYYY, h:mm a")}`}
    />
    <Divider />
    <ListItem
      style={styles.listitem}
      leftIcon={<i className="fa fa-gamepad fa-2x" aria-hidden="true"></i>}
      primaryText="Playthrus Served"
      secondaryText={totalPlaythrus}
    />
    <Divider />
    <ListItem
      style={styles.listitem}
      leftIcon={<i className="fa fa-arrow-up fa-2x pokemon-blue" aria-hidden="true"></i>}
      primaryText="Rightiest Mon"
      secondaryText={rightiest.name}
    />
    <Divider />
    <ListItem
      style={styles.listitem}
      leftIcon={<i className="fa fa-arrow-down fa-2x pokemon-red" aria-hidden="true"></i>}
      primaryText="Wrongiest Mon"
      secondaryText={wrongiest.name}
    />
  </List>
)

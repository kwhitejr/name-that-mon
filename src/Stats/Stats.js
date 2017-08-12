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
} from './StatsActions'

import './Stats.css';

export class Stats extends Component {

  componentWillMount() {
    this.props.getRightiest()
    this.props.getWrongiest()
    this.props.getHighScore()
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
});

const mapDispatchToProps = (dispatch) => ({
  getRightiest: () => dispatch(getRightiest()),
  getWrongiest: () => dispatch(getWrongiest()),
  getHighScore: () => dispatch(getHighScore()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stats);

const styles = {
  subheader: {
    "font-smooth": "never",
    "-webkit-font-smoothing": "none",
    "font-family": "'pokemon-font', monospace", 
    "font-size": "30px",
    color: "black",
  },
  listitem: {
    "font-smooth": "never",
    "-webkit-font-smoothing": "none",
    "font-family": "'pokemon-font', monospace", 
    "font-size": "20px",
    color: "black",
  }
}

const StatsList = ({rightiest, wrongiest, highScore}) => (
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
      leftIcon={<i className="fa fa-hourglass-half fa-2x" aria-hidden="true"></i>}
      primaryText="Fastest Playthru"
      secondaryText="A Mere 5:30.27, Mon!"
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

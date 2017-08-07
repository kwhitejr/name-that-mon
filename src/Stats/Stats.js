import React, { Component } from 'react';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import MoodGood from 'material-ui/svg-icons/social/mood';
import MoodBad from 'material-ui/svg-icons/social/mood-bad';

import { 
  getRightiest,
  getWrongiest,
} from './StatsActions'

// import QuizTop from './QuizTop';
// import QuizAnswers from './QuizAnswers';
// import QuizProgress from './QuizProgress';

import './Stats.css';

export class Stats extends Component {

  componentWillMount() {
    this.props.getRightiest()
    this.props.getWrongiest()
  }

  render() {
    return (      
      <StatsList {...this.props} />
    )
  }

}

const mapStateToProps = (state) => ({
  wrongiest:  state.stats.wrongiest,
  rightiest:  state.stats.rightiest,
});

const mapDispatchToProps = (dispatch) => ({
  getRightiest: () => dispatch(getRightiest()),
  getWrongiest: () => dispatch(getWrongiest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stats);

const StatsList = ({rightiest, wrongiest}) => (
  <List>
    <ListItem
      leftIcon={<MoodGood />}
      primaryText="Rightiest Mon"
      secondaryText={`${rightiest.name}; ${rightiest.count} wins.`}
    />
    <ListItem
      leftIcon={<MoodBad />}
      primaryText="Wrongiest Mon"
      secondaryText={`${wrongiest.name}; ${wrongiest.count} fails.`}
    />
  </List>
)

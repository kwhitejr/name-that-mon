import React, { Component } from 'react';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import { 
  getRightiest,
  getWrongiest,
} from './StatsActions'

import './Stats.css';

export class Stats extends Component {

  componentWillMount() {
    this.props.getRightiest()
    this.props.getWrongiest()
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
    <Subheader>Some Facts, Mon!</Subheader>
    <Divider />
    <ListItem
      leftIcon={<i className="fa fa-arrow-up fa-2x pokemon-blue" aria-hidden="true"></i>}
      primaryText="Rightiest Mon"
      secondaryText={rightiest.name}
    />
    <Divider />
    <ListItem
      leftIcon={<i className="fa fa-arrow-down fa-2x pokemon-red" aria-hidden="true"></i>}
      primaryText="Wrongiest Mon"
      secondaryText={wrongiest.name}
    />
  </List>
)

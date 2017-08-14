import React from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';

import { 
  resetThenHome, 
} from '../Result/ResultActions';

const styles = {
  appBar: {
    backgroundColor: "#f00000",
    fontColor: "#222224",
  },
  title: {
    color: "#222224",
    "fontSmooth": "never",
    "WebkitFontSmoothing": "none",
    "fontFamily": "'pokemon-font', monospace", 
    "fontSize": "30px",
  }
}

const Header = () => (
  <AppBar
    className="header"
    style={styles.appBar}
    title="Name That Mon!"
    titleStyle={styles.title}
    iconClassNameLeft="fa fa-home fa-2x header-logo"
    onLeftIconButtonTouchTap={resetThenHome} 
  />
);

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  resetThenHome: (e) => dispatch(resetThenHome()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
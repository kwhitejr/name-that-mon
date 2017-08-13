import React from 'react';
import AppBar from 'material-ui/AppBar';

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
    // showMenuIconButton={false}
    // iconElementLeft={<FontIcon className="muidocs-icon-action-home"></FontIcon>}
    iconClassNameLeft="fa fa-home fa-2x header-logo"
    // iconClassNameRight="muidocs-icon-navigation-expand-more" 
  />
);

export default Header;

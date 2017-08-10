import React from 'react';
import AppBar from 'material-ui/AppBar';

const styles = {
  backgroundColor: "#f00000",
  textColor: "#222224", // #222224 #f0f0f0
}

const Header = () => (
  <AppBar
    className="header"
    style={styles}
    title="Name That 'Mon!"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
);

export default Header;

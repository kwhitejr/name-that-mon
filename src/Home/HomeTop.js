import React from 'react';
import PropTypes from 'prop-types'; 
import { Card, CardMedia } from 'material-ui/Card';

const styles = {
  backgroundColor: "#f0f0f0",
}

let imgUrl = require(`../assets/pokemon-logo.png`)

const HomeTop = () => (
  <div className="top">
    <Card style={styles}>
      <CardMedia>
        <img src={imgUrl} alt=""/>
      </CardMedia>
    </Card>
  </div>

)

HomeTop.propTypes = {

};

export default HomeTop;

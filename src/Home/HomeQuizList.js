import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

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

const pokemonTypes = [
  { 
    quizSet: "Normal", 
    sprite: null,
    color: "#C4C1BB",
  },
  {
    quizSet: "Bug",
    sprite: null,
    color: "#A2B21B",
  },
  {
    quizSet: "Dark",
    sprite: null,
    color: "#3C2C22",
  },
  {
    quizSet: "Dragon",
    sprite: null,
    color: "#735BDC",
  },
  {
    quizSet: "Electric",
    sprite: null,
    color: "#F9B816",
  },
  {
    quizSet: "Fairy",
    sprite: null,
    color: "#F8B2F4",
  },
  {
    quizSet: "Fighting",
    sprite: null,
    color: "#7E321B",
  },
  {
    quizSet: "Fire",
    sprite: null,
    color: "#C82003",
  },
  {
    quizSet: "Flying",
    sprite: null,
    color: "#8BA1EE",
  },
  {
    quizSet: "Ghost",
    sprite: null,
    color: "#5E5EB0",
  },
  {
    quizSet: "Grass",
    sprite: null,
    color: "#66BB2B",
  },
  {
    quizSet: "Ground",
    sprite: null,
    color: "#CAAB4F",
  },
  {
    quizSet: "Ice",
    sprite: null,
    color: "#6BD3F4",
  },
  {
    quizSet: "Poison",
    sprite: null,
    color: "#68296A",
  },
  {
    quizSet: "Psychic",
    sprite: null,
    color: "#E03167",
  },
  {
    quizSet: "Rock",
    sprite: null,
    color: "#9E853E",
  },
  {
    quizSet: "Steel",
    sprite: null,
    color: "#8F8EA1",
  },
  {
    quizSet: "Water",
    sprite: null,
    color: "#0D66C3",
  },
]

const pokemonGenerations = [
  {
    quizSet: 1,
    sprite: null
  },
  {
    quizSet: 2,
    sprite: null
  },
  {
    quizSet: 3,
    sprite: null
  },
  {
    quizSet: 4,
    sprite: null
  },
  {
    quizSet: 5,
    sprite: null
  },
  {
    quizSet: 6,
    sprite: null
  },
  {
    quizSet: 7,
    sprite: null
  },
]

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {

    componentWillMount() {
      this.setState({
        selectedQuizType: this.props.defaultValue,
      });
    }

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedQuizType}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

class HomeQuizList extends Component {

  handleFetchQuiz(quizType, quizSet) {
    const { fetchQuizData } = this.props
    fetchQuizData(quizType, quizSet)
  }

  render() {
    return (
      <div>
        <SelectableList defaultValue={null} >
          <Subheader
            style={styles.subheader}
          >Pick a Quiz!</Subheader>
          <Divider />
          <ListItem
            value="generation"
            primaryText="Pokemon Generations"
            primaryTogglesNestedList={true}
            style={styles.listitem}
            // hoverColor="#3B4CCA"
            leftAvatar={<Avatar src="" />}
            nestedItems={pokemonGenerations.map( (generation, i) => (
              <ListItem
                key={i}
                value={{ 
                  type: 'generation', 
                  value: generation.quizSet 
                }}
                style={styles.listitem}
                primaryText={`Generation ${generation.quizSet}`}
                leftAvatar={<Avatar src={generation.sprite} />}
                onTouchTap={() => { this.handleFetchQuiz('generation', generation.quizSet) }}
              />
            ))}
          />
          <ListItem
            value="type"
            primaryText="Pokemon Types"
            primaryTogglesNestedList={true}
            style={styles.listitem}
            // hoverColor="#cc0000"
            leftAvatar={<Avatar src="" />}
            nestedItems={pokemonTypes.map( (type, i) => (
              <ListItem
                key={i}
                value={type.quizSet}
                style={styles.listitem}
                primaryText={type.quizSet}
                hoverColor={type.color}
                leftAvatar={<Avatar src={type.sprite} />}
                onTouchTap={() => { this.handleFetchQuiz('type', type.quizSet) }}
              />
            ))}
          />
          <ListItem
            value="legendary"
            primaryText="Legendary Pokemon"
            style={styles.listitem}
            // hoverColor="#b3a125"
            leftAvatar={<Avatar src="" />}
            onTouchTap={() => { this.handleFetchQuiz('legendary', null) }}
          />
        </SelectableList>
      </div>
    );
  }
}

export default HomeQuizList;

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
    name: "Normal", 
    sprite: null,
    color: "#C4C1BB",
  },
  {
    name: "Bug",
    sprite: null,
    color: "#A2B21B",
  },
  {
    name: "Dark",
    sprite: null,
    color: "#3C2C22",
  },
  {
    name: "Dragon",
    sprite: null,
    color: "#735BDC",
  },
  {
    name: "Electric",
    sprite: null,
    color: "#F9B816",
  },
  {
    name: "Fairy",
    sprite: null,
    color: "#F8B2F4",
  },
  {
    name: "Fighting",
    sprite: null,
    color: "#7E321B",
  },
  {
    name: "Fire",
    sprite: null,
    color: "#C82003",
  },
  {
    name: "Flying",
    sprite: null,
    color: "#8BA1EE",
  },
  {
    name: "Ghost",
    sprite: null,
    color: "#5E5EB0",
  },
  {
    name: "Grass",
    sprite: null,
    color: "#66BB2B",
  },
  {
    name: "Ground",
    sprite: null,
    color: "#CAAB4F",
  },
  {
    name: "Ice",
    sprite: null,
    color: "#6BD3F4",
  },
  {
    name: "Poison",
    sprite: null,
    color: "#68296A",
  },
  {
    name: "Psychic",
    sprite: null,
    color: "#E03167",
  },
  {
    name: "Rock",
    sprite: null,
    color: "#9E853E",
  },
  {
    name: "Steel",
    sprite: null,
    color: "#8F8EA1",
  },
  {
    name: "Water",
    sprite: null,
    color: "#0D66C3",
  },
]

const pokemonGenerations = [
  {
    number: 1,
    sprite: null
  },
  {
    number: 2,
    sprite: null
  },
  {
    number: 3,
    sprite: null
  },
  {
    number: 4,
    sprite: null
  },
  {
    number: 5,
    sprite: null
  },
  {
    number: 6,
    sprite: null
  },
  {
    number: 7,
    sprite: null
  },

]

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      // defaultValue: PropTypes.number.isRequired,
    };

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

const HomeQuizList = ({ beginGenerationQuiz, beginPokemonTypeQuiz, beginLegendaryQuiz }) => (
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
            value: generation.number 
          }}
          style={styles.listitem}
          primaryText={`Generation ${generation.number}`}
          leftAvatar={<Avatar src={generation.sprite} />}
          onTouchTap={beginGenerationQuiz.bind(this, generation.number)}
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
          value={type.name}
          style={styles.listitem}
          primaryText={type.name}
          hoverColor={type.color}
          leftAvatar={<Avatar src={type.sprite} />}
          onTouchTap={beginPokemonTypeQuiz.bind(this, type.name)}
        />
      ))}
    />
    <ListItem
      value="legendary"
      primaryText="Legendary Pokemon"
      style={styles.listitem}
      // hoverColor="#b3a125"
      leftAvatar={<Avatar src="" />}
      onTouchTap={beginLegendaryQuiz}
    />
  </SelectableList>
);

export default HomeQuizList;

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const styles = {
  listItem: {
    backgroundColor: "white",
  }
}

const pokemonTypes = [
  { 
    name: "Normal", 
    sprite: null,
  },
  {
    name: "Bug",
    sprite: null,
  },
  {
    name: "Dark",
    sprite: null,
  },
  {
    name: "Dragon",
    sprite: null,
  },
  {
    name: "Electric",
    sprite: null,
  },
  {
    name: "Fairy",
    sprite: null,
  },
  {
    name: "Fighting",
    sprite: null,
  },
  {
    name: "Fire",
    sprite: null,
  },
  {
    name: "Flying",
    sprite: null,
  },
  {
    name: "Ghost",
    sprite: null,
  },
  {
    name: "Grass",
    sprite: null,
  },
  {
    name: "Ground",
    sprite: null,
  },
  {
    name: "Ice",
    sprite: null,
  },
  {
    name: "Poison",
    sprite: null,
  },
  {
    name: "Psychic",
    sprite: null,
  },
  {
    name: "Rock",
    sprite: null,
  },
  {
    name: "Steel",
    sprite: null,
  },
  {
    name: "Water",
    sprite: null,
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

    handleRequestChange = (event, value) => {
      // console.log(value)
      // const quizType = value.type
      // const quizValue = value.value
      // if (quizType === 'generation') { beginGenerationQuiz(quizValue); }
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
    <ListItem
      value="generation"
      primaryText="Generations"
      disabled={true}
      style={styles.listItem}
      leftAvatar={<Avatar src="" />}
      nestedItems={pokemonGenerations.map( (generation, i) => (
        <ListItem
          key={i}
          style={styles.listItem}
          value={{ 
            type: 'generation', 
            value: generation.number 
          }}
          primaryText={`Generation ${generation.number}`}
          leftAvatar={<Avatar src={generation.sprite} />}
          onTouchTap={beginGenerationQuiz.bind(this, generation.number)}
        />
      ))}
    />
    <ListItem
      value="type"
      primaryText="Pokemon Types"
      disabled={true}
      style={styles.listItem}
      leftAvatar={<Avatar src="" />}
      nestedItems={pokemonTypes.map( (type, i) => (
        <ListItem
          key={i}
          style={styles.listItem}
          value={type.name}
          primaryText={type.name}
          leftAvatar={<Avatar src={type.sprite} />}
          onTouchTap={beginPokemonTypeQuiz.bind(this, type.name)}
        />
      ))}
    />
    <ListItem
      value="legendary"
      primaryText="Legendaries"
      style={styles.listItem}
      leftAvatar={<Avatar src="" />}
      onTouchTap={beginLegendaryQuiz}
    />
  </SelectableList>
);

export default HomeQuizList;

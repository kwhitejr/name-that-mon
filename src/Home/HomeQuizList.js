import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';

const styles = {
  listItem: {
    backgroundColor: "white",
  }
}

const pokemonTypes = [
  "Normal",
  "Bug",
  "Dark",
  "Dragon",
  "Electric",
  "Fairy",
  "Fighting",
  "Fire",
  "Flying",
  "Ghost",
  "Grass",
  "Ground",
  "Ice",
  "Poison",
  "Psychic",
  "Rock",
  "Steel",
  "Water",
]

const pokemonGenerations = [1,2,3,4,5,6,7]

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
      const quizType = value.type
      const quizValue = value.value
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

const HomeQuizList = ({ beginGenerationQuiz }) => (
  <SelectableList defaultValue={null} >
    <ListItem
      value="generation"
      primaryText="Generations"
      disabled={true}
      style={styles.listItem}
      leftAvatar={<Avatar src="" />}
      nestedItems={pokemonGenerations.map( (generationNumber, i) => (
        <ListItem
          key={i}
          style={styles.listItem}
          value={{ 
            type: 'generation', 
            value: generationNumber 
          }}
          primaryText={`Generation ${generationNumber}`}
          leftAvatar={<Avatar src="" />}
          onTouchTap={beginGenerationQuiz.bind(this, generationNumber)}
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
          value={type}
          primaryText={type}
          leftAvatar={<Avatar src="" />}
          // onTouchTap={beginGenerationQuiz.bind(generationNumber)}
        />
      ))}
    />
    <ListItem
      value="legendary"
      primaryText="Legendaries"
      style={styles.listItem}
      leftAvatar={<Avatar src="" />}
    />
  </SelectableList>
);

export default HomeQuizList;

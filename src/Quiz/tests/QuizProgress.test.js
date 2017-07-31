import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme'

import QuizProgress from '../QuizProgress';

function setup() {
  const props = {
    correctAnswerStack: jest.array,
  	quizLength: jest.number,
  }

  const enzymeWrapper = mount(<QuizProgress {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('QuizProgress', () => {
    // it('should render self and subcomponents', () => {
    //   const { enzymeWrapper } = setup()

    //   expect(enzymeWrapper.find('header').hasClass('header')).toBe(true)

    //   expect(enzymeWrapper.find('h1').text()).toBe('todos')

    //   const todoInputProps = enzymeWrapper.find('TodoTextInput').props()
    //   expect(todoInputProps.newTodo).toBe(true)
    //   expect(todoInputProps.placeholder).toEqual('What needs to be done?')
    // })

    // it('should have props `correctAnswerStack` and `quizLength`', () => {
    //   const { enzymeWrapper, props } = setup()
    //   const input = enzymeWrapper.find('TodoTextInput')
    //   input.props().onSave('')
    //   expect(props.addTodo.mock.calls.length).toBe(0)
    //   input.props().onSave('Use Redux')
    //   expect(props.addTodo.mock.calls.length).toBe(1)
    // })
  })
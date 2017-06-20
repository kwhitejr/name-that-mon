import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import quizReducer from './quizReducer'

const rootReducer = combineReducers({
  routing,
  quizReducer,
});

export default rootReducer;
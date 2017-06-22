import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import quizReducer from './quizReducer'
// import resultReducer from './resultReducer'

const rootReducer = combineReducers({
  routing,
  quizReducer,
  // resultReducer,
});

export default rootReducer;
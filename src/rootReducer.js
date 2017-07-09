import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import quizReducer from './quizReducer'

const rootReducer = combineReducers({
  router,
  quizReducer,
});

export default rootReducer;
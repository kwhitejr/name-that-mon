import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import quizReducer from './quizReducer'
// import resultReducer from './resultReducer'

const rootReducer = combineReducers({
  router,
  quizReducer,
  // resultReducer,
});

export default rootReducer;
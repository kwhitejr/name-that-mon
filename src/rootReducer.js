import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import quizReducer from './Quiz/QuizReducer'
// import resultReducer from './Result/ResultReducer'

const rootReducer = combineReducers({
  router,
  quizReducer,
  // resultReducer,
});

export default rootReducer;
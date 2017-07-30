import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import quizInstance from './Quiz/QuizInstanceReducer'
import quizMetaData from './Quiz/QuizMetaDataReducer'
// import resultReducer from './Result/ResultReducer'

const rootReducer = combineReducers({
  router,
  quizInstance,
  quizMetaData,
});

export default rootReducer;
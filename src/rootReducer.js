import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import quizReducer from './Quiz/QuizReducer'
import quizMetaData from './Quiz/QuizMetaDataReducer'
// import resultReducer from './Result/ResultReducer'

const rootReducer = combineReducers({
  router,
  quizReducer,
  quizMetaData,
});

export default rootReducer;
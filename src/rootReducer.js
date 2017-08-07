import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import quizInstance from './Quiz/QuizInstanceReducer'
import quizMetaData from './Quiz/QuizMetaDataReducer'
import stats from './Stats/StatsReducer'

const rootReducer = combineReducers({
  router,
  quizInstance,
  quizMetaData,
  stats
});

export default rootReducer;
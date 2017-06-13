import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
// import { reducer as formReducer } from 'redux-form';
// import authReducer from 'reducers/auth_reducer';
// import selectorReducer from 'reducers/selector_reducer';
// import workoutReducer from 'reducers/workout_reducer';

const rootReducer = combineReducers({
  routing,
});

export default rootReducer;
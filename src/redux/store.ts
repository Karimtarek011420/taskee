import { combineReducers } from 'redux';
import { jobReducer } from './reducers/jobReducer';
import { skillReducer } from './reducers/skillReducer';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
const rootReducer = combineReducers({
  jobs: jobReducer,
  skills: skillReducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

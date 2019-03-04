// `combineReducers` is not currently being used...but it should!
// When you're ready to use it, un-comment the line below!

import { combineReducers, createStore, applyMiddleware } from 'redux';
import studentsReducer from './studentsReducer';
import campusesReducer from './campusesReducer';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

// const initialState = {};

const rootReducer = combineReducers({
  students: studentsReducer,
  campuses: campusesReducer,
});

export default rootReducer;

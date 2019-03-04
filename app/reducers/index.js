// `combineReducers` is not currently being used...but it should!
// When you're ready to use it, un-comment the line below!

import { combineReducers } from 'redux';
import calculationsReducer from './calculationsReducer';
// import studentsReducer from './studentsReducer';
// import campusesReducer from './campusesReducer';

// const initialState = {};

const rootReducer = combineReducers({ calculations: calculationsReducer });
// const rootReducer = combineReducers({
//   students: studentsReducer,
//   campuses: campusesReducer,
// });

export default rootReducer;

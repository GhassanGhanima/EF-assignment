// import { configureStore} from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
// import thunk from 'redux-thunk';



// const rootReducer = combineReducers({
//   university: universityReducer
//   // Add more reducers as needed
// });

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().prepend<any>(thunk),
//   devTools: process.env.NODE_ENV !== 'production',
// });

// export default store;


import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { universityReducer } from "../reducer/universitiesReducers";


const store = createStore(universityReducer, applyMiddleware(thunk));

export default store;




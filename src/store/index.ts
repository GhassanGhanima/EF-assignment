
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { universityReducer } from "../reducer/universitiesReducers";


const store = createStore(universityReducer, applyMiddleware(thunk));

export default store;




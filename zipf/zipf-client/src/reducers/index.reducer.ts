import { combineReducers } from "redux";
import { wordReducer } from './words.reducer'
export const AppReducer = combineReducers({ wordReducer });
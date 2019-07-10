import { IAppState } from '../models/AppState.model';
import { IReduxActionModel } from '../models/reduxAction.model';
import { ActionNames } from '../constants/actionNames';
import { initialState } from './initialAppState'

export const wordReducer = (state: IAppState = initialState, action: IReduxActionModel) => {
    switch (action.type) {
        case ActionNames.UPDATE_WORD_LIST: {
            let newState = Object.assign({}, state);
            newState.words.wordList = [...newState.words.wordList, ...action.data];
            return newState;
        }
        case ActionNames.EMPTY_WORD_LIST: {
            let newState = Object.assign({}, state);
            newState.words.wordList = [];
            return newState;
        }
        default: return state;
    }
}
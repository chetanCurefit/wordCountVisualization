import { ActionNames } from '../constants/actionNames';

export class WordsAction {
    public static emptyWordsList() {
        return { type: ActionNames.EMPTY_WORD_LIST }
    }
    public static updateWordsList(data: string[]) {
        return { type: ActionNames.UPDATE_WORD_LIST, data }
    }
}
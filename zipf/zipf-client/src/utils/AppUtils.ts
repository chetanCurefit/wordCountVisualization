
import { IWordFrequency } from '../models/wordFrequency.model';

export class AppUtils {
    static getWordFrequencyMap(wordList: string[]): IWordFrequency[] {
        const wordFrequencyList: IWordFrequency[] = [];
        wordList.sort().forEach(word => {
            const currentWordIndex = wordFrequencyList.findIndex(({ text }) => text === word);
            if (currentWordIndex === -1) {
                wordFrequencyList.push({ text: word, value: 1 });
            }else{
                wordFrequencyList[currentWordIndex].value =  wordFrequencyList[currentWordIndex].value + 1;
            }
        })
        return wordFrequencyList;
    }
}
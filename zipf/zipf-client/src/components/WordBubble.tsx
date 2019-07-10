import React from 'react';
import { IWordFrequency } from '../models/wordFrequency.model'
import '../styles/themeClasses.css';

// @ts-ignore
const WordCloud = require('react-d3-cloud');
export interface IWordBubbleProps {
    wordFrequencyList: IWordFrequency[]
}

export class WordBubble extends React.Component<IWordBubbleProps, any> {

    private fontSizeMapper(wordFrequency: IWordFrequency): number {
        return Math.log2(wordFrequency.value) * 5;
    }

    private rotate(wordFrequency: IWordFrequency): number {
        return wordFrequency.value % 360;
    }

    render() {
        const { wordFrequencyList } = this.props;
        return (<div className="text-center">
            <WordCloud
            data={wordFrequencyList}
                fontSizeMapper={this.fontSizeMapper}
                rotate={this.rotate}
            />
        </div>)
    }

}
import React from 'react';
import './styles/App.css';
import './styles/themeClasses.css';
import io from 'socket.io-client';
import { ApiConstants } from './constants/ApiConstants';
import { connect } from 'react-redux';
import { WordsAction } from './actions/words.action';
import { WordBubble } from './components/WordBubble';
import { AppUtils } from './utils/AppUtils'

interface IAppComponentProps {
  emptyWordsList: () => void;
  updateWordsList: (wordsList: string[]) => void;
  wordsList: string[]
}


class App extends React.Component<IAppComponentProps, any> {

  componentDidMount() {
    this.props.emptyWordsList();
    this.connectToSocket();
  }

  private connectToSocket(): void {
    console.log(ApiConstants.SOCKET_CONNECT_URL);
    const socket = io(ApiConstants.SOCKET_CONNECT_URL);
    socket.on('connect', () => {
      console.log('Connected to socket server...');
    });
    socket.on('event', (data: string[]) => {
      this.props.updateWordsList(data);
    });
    socket.on('disconnect', function () {

    });
  }

  render() {
    const { wordsList } = this.props
    return (
      <div>
        <div className="text-center white-font">
          <h2>Word Frequency Visualization</h2>
          <h3>Words With Greater Frequency Appears in Greater Size</h3>
        </div>


        <WordBubble wordFrequencyList={AppUtils.getWordFrequencyMap(wordsList)} />
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    wordsList: state.wordReducer.words.wordList || []
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    emptyWordsList: () => dispatch(WordsAction.emptyWordsList()),
    updateWordsList: (wordsList: string[]) => dispatch(WordsAction.updateWordsList(wordsList))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

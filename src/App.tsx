import React from 'react';
import './App.css';
import { StickyNote } from './types/index';
import { StickyNoteComponent } from './components/StickyNoteComponent';
import { getAllStickyNotes } from './services/IndexedDBService';

type AppState = {
  stickynotes : Array<StickyNote>
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      stickynotes : [{id: 'initial', heading: ' ', body: 'loading...'}]
    }
  }

  componentDidMount() {
    getAllStickyNotes()
      .then((stickynotes : Array<StickyNote>) => {
        this.setState({stickynotes : stickynotes});
      }).catch(err => console.error(err)); // do better handling in the near future. Ask user to upgrade browser.
  }

  render() {
    return (
      <main>
        {
          this.state.stickynotes.map(element => <StickyNoteComponent key={element.id} id={element.id} heading={element.heading} body={element.body}></StickyNoteComponent>)
        }
      </main>
    );
  }
}

export default App;

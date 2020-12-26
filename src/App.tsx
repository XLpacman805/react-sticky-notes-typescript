import React from 'react';
import './App.css';
import { StickyNote } from './types/index';
import { StickyNoteComponent } from './components/StickyNoteComponent';
import { getAllStickyNotes, createStickyNote, deleteStickyNote } from './services/IndexedDBService';

type AppState = {
  stickynotes : Array<StickyNote>
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      stickynotes : [{id: 'initial', heading: ' ', body: 'loading...'}]
    }
    this.handleCreate = this.handleCreate.bind(this);
  }

  componentDidMount() {
    getAllStickyNotes()
      .then((stickynotes : Array<StickyNote>) => {
        this.setState({stickynotes : stickynotes});
      }).catch(err => console.error(err)); // do better handling in the near future. Ask user to upgrade browser.
  }

  handleCreate(event : any) {
    createStickyNote()
      .then(() => getAllStickyNotes())
      .then(stickynotes => this.setState({stickynotes: stickynotes}))
      .catch(err => console.error(err));
  }

  handleDelete(id : string) {
    deleteStickyNote(id)
        .then(() => getAllStickyNotes())
        .then(stickynotes => this.setState({stickynotes: stickynotes})) 
        .catch(err => console.error(err));
}

  render() {
    return (
      <main>
        <div className="stickynote-container" >
          {
            this.state.stickynotes
              .map(stickynote => 
                <div>
                  <StickyNoteComponent key={stickynote.id} id={stickynote.id} heading={stickynote.heading} body={stickynote.body}>
                    <button onClick={event => this.handleDelete(stickynote.id)}>Delete</button>
                  </StickyNoteComponent>
                  <br />
                </div>
              )
          }
        </div>
        <button onClick={this.handleCreate}>Create</button>
      </main>
    );
  }
}

export default App;

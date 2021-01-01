import React from 'react';
import './App.css';
import { StickyNote } from './types/index';
import { StickyNoteComponent } from './components/StickyNoteComponent';
import { getAllStickyNotes, createStickyNote, deleteStickyNote } from './services/IndexedDBService';
import { NavigationComponent } from './components/NavigationComponent';

type AppState = {
  stickynotes : Array<StickyNote>
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      stickynotes : [{id: 'initial', heading: ' ', body: 'loading...', lastModified: Date.now()}]
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
      <div>
        <NavigationComponent />
        <main>
          <div className="stickynote-container" >
            {
              this.state.stickynotes
                .map(stickynote => 
                  <div key={stickynote.id} >
                    <StickyNoteComponent id={stickynote.id} heading={stickynote.heading} body={stickynote.body} lastModified={stickynote.lastModified}>
                      <button className="button-delete" onClick={event => this.handleDelete(stickynote.id)}> ❌ </button>
                    </StickyNoteComponent>
                    <br />
                  </div>
                )
            }
          </div>
          <button className="button-create" onClick={this.handleCreate}>+</button>
        </main>
      </div>
    );
  }
}

export default App;

import React from 'react';
import { StickyNote } from '../types/index';
import { updateStickyNote } from '../services/IndexedDBService';
import './StickyNoteComponent.css';


export class StickyNoteComponent extends React.Component<StickyNote, StickyNote> {
    timeout: any;
    constructor(props : StickyNote) {
        super(props);
        this.state = { 
            id : props.id, 
            heading: props.heading,
            body : props.body,
            lastModified: props.lastModified
        };
        this.timeout = null;
        this.handleChange = this.handleChange.bind(this);
    }
    
     handleChange(event : any, type: string) {
        clearTimeout(this.timeout);

        if (type === 'heading')
            this.setState({heading: event.target.value});
        else if (type === 'body') {
            this.setState({body: event.target.value});
        }
        // After 3 seconds of no new activity, save this sticky note data to the indexed db. 
        this.timeout = setTimeout(() => updateStickyNote({id: this.state.id, heading: this.state.heading, body: this.state.body, lastModified: Date.now()}), 3000);
     }

    render() {
        return (
            <div className="stickynote" id={this.state.id}>
                <input className="stickynote-heading" onChange={e => this.handleChange(e, 'heading')} type="text" value={this.state.heading} />
                <br />
                <textarea className="stickynote-body" onChange={e => this.handleChange(e, 'body')} value={this.state.body} />
                <br />
                {this.props.children}
            </div>
        )
    }
}
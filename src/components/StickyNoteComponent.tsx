import React from 'react';
import { StickyNote } from '../types/index';

export class StickyNoteComponent extends React.Component<StickyNote, {}> {
    constructor(props : StickyNote) {
        super(props);
        this.state = {};
    }

    /**
     * Need to write a handleChange method. 
     * Need to replace lable and p with inputs so that a user can type. 
     * The handleChange method should listen for changes. 
     * After a 3 seconds of no changes, it should then write to the indexedDB. 
     * I don't want to have a new transation on every keystroke. That would be expensive for a real db.
     */

    render() {
        return (
            <div className="stickynote" id={this.props.id}>
                <label>{this.props.heading}</label>
                <p>{this.props.body}</p>
                {this.props.children}
            </div>
        )
    }
}
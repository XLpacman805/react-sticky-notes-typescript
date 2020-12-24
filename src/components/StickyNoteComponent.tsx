import React from 'react';
import { StickyNote } from '../types/index';

export class StickyNoteComponent extends React.Component<StickyNote, {}> {
    constructor(props : StickyNote) {
        super(props);
        this.state = {};
    }

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
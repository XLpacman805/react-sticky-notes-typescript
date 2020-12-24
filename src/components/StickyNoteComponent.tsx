import React from 'react';
type StickyNoteProps = {
    id: string,
    heading: string,
    body: string
}

export class StickyNoteComponent extends React.Component<StickyNoteProps, {}> {
    render() {
        return (
            <div className="stickynote" id={this.props.id}>
                <label>{this.props.heading}</label>
                <p>{this.props.body}</p>
            </div>
        )
    }
}
import React, { Component } from 'react';

export default class BulgeBlock extends Component {
    render() {
        return (
            <div className="mini-block-wrapper bulge-block-wrapper">
                {this.props.children}
            </div>
        );
    }
}

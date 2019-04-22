import React, { Component } from 'react';

export default class GoBlock extends Component {
    render() {
        return (
            <div className="go-block-wrapper">
                <div>GO</div>
                <div>{this.props.current + '/' + this.props.max}</div>
            </div>
        );
    }
}

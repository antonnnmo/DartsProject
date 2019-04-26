import React, { Component } from 'react';

export default class GoBlock extends Component {
    render() {
        return (
            <div className="go-block-wrapper" onClick={this.props.onGo}>
                <div className="go-block-wrapper-left">GO</div>
                <div className="go-block-wrapper-right">{this.props.current + '\\' + this.props.max}</div>
            </div>
        );
    }
}

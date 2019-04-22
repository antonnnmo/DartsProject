import React, { Component } from 'react';

export default class Avatar extends Component {
    render() {
        return (
            <div className="avatar-wrapper">
                <div className="avatar">
                    {this.props.name &&
                        <img src={"/image/" + this.props.name} alt="dd"/>
                    }

                    {!this.props.name &&
                        <div className="text-avatar">{this.props.synonym}</div>
                    }
                </div>
            </div>
        );
    }
}

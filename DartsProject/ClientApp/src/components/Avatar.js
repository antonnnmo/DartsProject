import React, { Component } from 'react';

export default class Avatar extends Component {
    render() {
        return (
            <div className="avatar-wrapper clearfix">
                <div className="avatar clearfix">
                    {this.props.name &&
                        <img className="avatar-img" src={"/api/image/getImage?id=" + this.props.name} alt="dd" />
                    }

                    {!this.props.name &&
                        <div className="text-avatar">{this.props.synonym}</div>
                    }
                </div>
            </div>
        );
    }
}

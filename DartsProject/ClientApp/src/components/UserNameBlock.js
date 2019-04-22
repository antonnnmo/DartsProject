import React, { Component } from 'react';

export default class UserNameBlock extends Component {
    constructor() {
        super();
        this.state = {
            selected: '',
            isSelected: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        var selected = this.state.selected ? "" : "selected";
        var res = this.props.handleSelected && this.props.handleSelected(this.props.userId, !this.state.selected);
        if(res != -1)
        this.setState({ selected: selected, isSelected: !this.state.selected });
    };

    render() {
        return (
            <div className={"mini-block-wrapper " + this.state.selected} onClick = { this.handleClick } >
                {this.props.name}
            </div>
        );
    }
}

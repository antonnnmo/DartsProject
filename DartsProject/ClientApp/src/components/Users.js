import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Users';
import UserNameBlock from './UserNameBlock';
import BulgeBlock from './BulgeBlock';
import GoBlock from './GoBlock';

class Users extends Component {
    constructor() {
        super();

        this.handleSelected = this.handleSelected.bind(this);
    }

    componentDidMount() {
        this.props.loadData();
    }

    handleSelected(userId, isSelected) {
        if (isSelected && this.props.selectedUsers.length >= 5) {
            return -1;
        }

        this.props.handleSelected(userId, isSelected);
    }

    render() {
        //var users = this.props.users.map(u => <div className="mini-block-wrapper">{u.name}</div>);
        var users = this.props.users.map(u => <UserNameBlock name={u.name} userId={u.id} handleSelected={this.handleSelected} />);
        return (
            <div>
                <div className="players-left-container">
                    <div className="cool-player-info-container">
                        bla bla bla
                    </div>
                </div>
                <div className="players-right-container">
                    <div className="cool-player-info-container">
                        <div className="block-header-wrapper">
                            <BulgeBlock>
                                <select>
                                    <option selected={true}>Классика</option>
                                </select>
                            </BulgeBlock>

                            <GoBlock current={this.props.selectedUsers.length} max={5}>
                            </GoBlock>
                        </div>
                        {users}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => state.users,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Users);

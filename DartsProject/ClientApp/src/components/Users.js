import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Users';
import UserNameBlock from './UserNameBlock';
import BulgeBlock from './BulgeBlock';
import GoBlock from './GoBlock';
import Avatar from './Avatar';

class Users extends Component {
    constructor() {
        super();

        this.handleSelected = this.handleSelected.bind(this);
        this.go = this.go.bind(this);
    }

    componentDidMount() {
        this.props.loadData();
    }

    componentWillUnmount() {
        if (this.props.isRedirect === true) {
            this.props.forgetRedirect();
        }
    }

    handleSelected(userId, isSelected) {
        if (isSelected && this.props.selectedUsers.length >= 5) {
            return -1;
        }

        this.props.handleSelected(userId, isSelected);
    }

    go() {
        this.props.startGame(this.props.selectedUsers);
    }

    render() {
        //var users = this.props.users.map(u => <div className="mini-block-wrapper">{u.name}</div>);
        var users = this.props.users.map(u => <UserNameBlock isSelected={this.props.selectedUsers.indexOf(u.id) > -1} name={u.name} userId={u.id} handleSelected={this.handleSelected} />);
        var avatars = this.props.users.slice(0).sort(function () { return 0.5 - Math.random() }).slice(0, 6).map(a => <Avatar name={a.imageId === "00000000-0000-0000-0000-000000000000" ? "" : a.imageId} synonym={a.synonym} />);

        if (this.props.isRedirect === true) {
            this.props.forgetRedirect();
            return <Redirect to={this.props.redirectPage} />
        }

        return (
            <div>
                <div className="players-left-container">
                    <div className="cool-player-info-container">
                        bla bla bla
                    </div>

                    <div className="player-avatars-wrapper">
                        {avatars}
                    </div>
                </div>
                <div className="players-right-container">
                    <div className="cool-player-info-container">
                        <div className="block-header-wrapper">
                            <BulgeBlock>
                                <select defaultValue="classic">
                                    <option value="classic">Классика</option>
                                </select>
                            </BulgeBlock>

                            <GoBlock current={this.props.selectedUsers.length} onGo={this.go} max={5}>
                            </GoBlock>
                        </div>
                        <div>
                            {users}
                        </div>
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

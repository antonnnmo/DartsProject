import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Login';
import UserNameBlock from './UserNameBlock';
import BulgeBlock from './BulgeBlock';
import GoBlock from './GoBlock';
import Avatar from './Avatar';

class Login extends Component {
    constructor() {
        super();
        this.login = this.login.bind(this);
        this.state = {
            login: '',
            password: '',
            userName: '',
            synonym: '',
            isOnRegistering: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.requestRegistering = this.requestRegistering.bind(this);
        this.confirmRegistering = this.confirmRegistering.bind(this);
    }

    login() {
        this.props.login(this.state.login, this.state.password);
    }

    requestRegistering() {
        this.setState({ isOnRegistering: true});
    }

    confirmRegistering() {
        this.props.register(this.state.login, this.state.password, this.state.synonym, this.state.userName);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    render() {
        return (
            <div>
                Логин: <input value={this.state.login} onChange={this.handleChange} name="login" />
                {!this.state.isOnRegistering &&
                    <div> Пароль: <input type="password" value={this.state.password} name="password" onChange={this.handleChange} />
                    </div>
                }

                {this.state.isOnRegistering && <div>
                    Имя: <input name="userName" value={this.state.userName} onChange={this.handleChange}/>
                    Псевдоним: <input maxLength="2" value={this.state.synonym} name="synonym" onChange={this.handleChange} />
                    Пароль: <input type="password" value={this.state.password} name="password" onChange={this.handleChange} />
                    <button onClick={this.confirmRegistering}>Завести аккаунт</button>
                </div>}

                {!this.state.isOnRegistering && <button onClick={this.login}>Войти</button>}
                <button onClick={this.requestRegistering}>Завести аккаунт</button>
            </div>
        );
    }
}

export default connect(
    state => state.login,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Login);

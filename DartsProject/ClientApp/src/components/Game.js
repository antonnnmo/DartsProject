import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Game';
import UserNameBlock from './UserNameBlock';
import BulgeBlock from './BulgeBlock';
import GoBlock from './GoBlock';
import Avatar from './Avatar';

class Game extends Component {
    constructor() {
        super();

    }

    componentDidMount() {
        this.props.loadGameData();
    }

    render() {

        if (this.props.gameInfo.users && this.props.gameInfo.users.length === 0) {
            return (
                <div>
                    А где Игра? А вот Хрен, работать пора!
                </div>);
        }

        var userList = this.props.gameInfo.users && this.props.gameInfo.users.map(u => <div>{u.name} {u.score}</div>);
        var currentUser = this.props.gameInfo.users && this.props.gameInfo.users.find(u => u.id === this.props.gameInfo.currentUserId).name;
        return (
            <div>
                {userList}
                Бросает: {currentUser}
                <br/>
                Круг: {this.props.gameInfo.currentLeg} 
                Бросок: {this.props.gameInfo.currentShot}
                Счет по броскам: {this.props.gameInfo.currentTempScore}

                <button onClick={() => this.props.shot(0, 1, this.props.gameInfo.gameId)}>0</button>
                <button onClick={() => this.props.shot(1, 1, this.props.gameInfo.gameId)}>1</button>
                <button onClick={() => this.props.shot(2, 1, this.props.gameInfo.gameId)}>2</button>
                <button onClick={() => this.props.shot(3, 1, this.props.gameInfo.gameId)}>3</button>
                <button onClick={() => this.props.shot(1, 2, this.props.gameInfo.gameId)}>1x2</button>
                <button onClick={() => this.props.shot(2, 2, this.props.gameInfo.gameId)}>2x2</button>
                <button onClick={() => this.props.shot(3, 2, this.props.gameInfo.gameId)}>3x2</button>
                <button onClick={() => this.props.shot(4, 2, this.props.gameInfo.gameId)}>4x2</button>
                <button onClick={() => this.props.shot(5, 2, this.props.gameInfo.gameId)}>5x2</button>
                <button onClick={() => this.props.shot(6, 2, this.props.gameInfo.gameId)}>6x2</button>
                <button onClick={() => this.props.shot(7, 2, this.props.gameInfo.gameId)}>7x2</button>
                <button onClick={() => this.props.shot(8, 2, this.props.gameInfo.gameId)}>8x2</button>
                <button onClick={() => this.props.shot(9, 2, this.props.gameInfo.gameId)}>9x2</button>
                <button onClick={() => this.props.shot(20, 3, this.props.gameInfo.gameId)}>20x3</button>
                <button onClick={() => this.props.shot(20, 1, this.props.gameInfo.gameId)}>20x1</button>
                <button onClick={() => this.props.shot(20, 2, this.props.gameInfo.gameId)}>20x2</button>
            </div>
        );
    }
}

export default connect(
    state => state.game,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Game);

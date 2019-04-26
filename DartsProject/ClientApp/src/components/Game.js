import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Game';
import ScoringBlock from './ScoringBlock';
import BulgeBlock from './BulgeBlock';
import GoBlock from './GoBlock';
import Avatar from './Avatar';

class Game extends Component {
    constructor() {
        super();
        this.state = {
            selectedUserId: ''
        };
        this.shot = this.shot.bind(this);
        this.selectUser = this.selectUser.bind(this);
    }

    componentDidMount() {
        this.props.loadGameData();
    }

    shot(scoreType, score) {
        this.props.shot(score, scoreType, this.props.gameInfo.gameId);
    }

    selectUser(userId) {
        this.setState({ selectedUserId: userId});
    }

    render() {

        if (this.props.gameInfo.users && this.props.gameInfo.users.length === 0) {
            return (
                <div>
                    А где Игра? А вот Хрен, работать пора!
                </div>);
        }

        var userList = this.props.gameInfo.users && this.props.gameInfo.users.map(u => <div className={"game-user " + (u.position % 2 === 0 ? '' : 'odd')}><div className="game-user-score">{u.score}</div><div className="game-user-avatar clearfix"><Avatar synonym={u.synonym} name={u.image} /></div><div className="game-user-name">{u.name}</div></div>);
        var selectedUserId = this.state.selectedUserId;
        var userWinnerList = this.props.gameInfo.users && this.props.gameInfo.users.map(u => <div onClick={() => this.selectUser(u.id)}
            className={"game-user " +
                (u.id === selectedUserId ? 'selected ' : '') +
                (u.position % 2 === 0 ? '' : 'odd')}><div className="game-user-score">{u.score}</div><div className="game-user-avatar clearfix"><Avatar synonym={u.synonym} name={u.image} /></div><div className="game-user-name">{u.name}</div></div>);
        var currentUser = this.props.gameInfo.users && this.props.gameInfo.users.find(u => u.id === this.props.gameInfo.currentUserId);
        var shots = this.props.gameInfo.shots && this.props.gameInfo.shots.map(s => <div className={s.scoreType === 1 ? 'shot single-shot' : (s.scoreType === 2 ? 'shot double-shot' : 'shot triple-shot')}>{s.score * s.scoreType}</div>);
        return (
            <div>
                {!this.props.isEndGame &&
                    <div>
                        <div className="game-info-block">Круг: {this.props.gameInfo.currentLeg}</div>
                        <div className="current-score-block clearfix">
                            <div className="avatar-outer clearfix">
                                <Avatar synonym={currentUser && currentUser.synonym} name={currentUser && currentUser.image} />
                                <div className="score-block clearfix">
                                    {this.props.gameInfo.currentTempScore}
                                </div>
                            </div>
                        </div>
                        <div className="current-shots-outer">
                        <div className="current-shots-inner">
                            <div className="shot">
                                <div className="cancel-shot" onClick={() => this.props.cancelLastShot(this.props.gameInfo.gameId)}>
                                </div>
                             </div>
                                {shots}
                            </div>
                        </div>
                        <ScoringBlock onShot={this.shot} />

                        <div className="current-game-users-block clearfix">
                            <div className="current-game-users-inner clearfix">
                                {userList}
                            </div>
                        </div>
                    </div>
                }
                {this.props.isEndGame &&
                    <div>
                    Выберите победителя
                    {userWinnerList}
                    <button onClick={() => this.props.winGame(this.state.selectedUserId, this.props.gameInfo.gameId)}>Победить!</button>
                    </div>
                }
            </div>
        );
    }
}

export default connect(
    state => state.game,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Game);

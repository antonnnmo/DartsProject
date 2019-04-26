import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Profile';
import UserNameBlock from './UserNameBlock';
import BulgeBlock from './BulgeBlock';
import GoBlock from './GoBlock';
import Avatar from './Avatar';

class Profile extends Component {
    avatarInput = null;
    constructor() {
        super();
        this.addAvatar = this.addAvatar.bind(this);
        this.onAvatarInputChange = this.onAvatarInputChange.bind(this);
    }
    componentDidMount() {
        this.props.loadData();
    }

    addAvatar() {
        var el = document.getElementById("avatar-input");
        el && el.click();
    }

    onAvatarInputChange(evt: any) {
        var file = this.avatarInput && this.avatarInput.files && this.avatarInput.files[0];

        if (file) {
            this.props.uploadAvatar(file);
        }
    }

    render() {
        return (
            <div>
                <div className="cool-player-info-container flow-root">
                    <div className="left-profile-block">
                        <div className="avatar-block">
                            <Avatar name={this.props.profileInfo.imageId === "00000000-0000-0000-0000-000000000000" ? "" : this.props.profileInfo.imageId} />
                        </div>
                        <button onClick={this.addAvatar}>Загрузить новый аватар </button>
                    </div>
                    <div className="left-profile-block">
                        <div className="header-text">{this.props.profileInfo.name}</div>
                        <div>
                            <div>Количество побед: {this.props.profileInfo.winCount}</div>
                            <div>Количество побед в сезоне: {this.props.profileInfo.winCountInSeason}</div>
                            <div>Количество игр: {this.props.profileInfo.gameCount}</div>
                            <div>Количество игр за сезон: {this.props.profileInfo.gameSeasonCount}</div>
                            <div>Win rate: {(this.props.profileInfo.winCount / this.props.profileInfo.gameCount).toFixed(2)}%</div>
                            <div>Win rate за сезон: {(this.props.profileInfo.winCountInSeason / this.props.profileInfo.gameSeasonCount).toFixed(2)}%</div>
                            <div>Рейтинг: {this.props.profileInfo.rate}</div>
                            <div>Лучший бросок: {this.props.profileInfo.bestScore} очков</div>
                            <div>Лучший бросок за сезон: # очков</div>
                            <div>Самая быстрая победа: {this.props.profileInfo.fastWin} круг</div>
                        </div>
                    </div>
                    
                    <input type="file" id="avatar-input" name="file" onChange={this.onAvatarInputChange} style={{ display: "none" }} ref={(ref) => this.avatarInput = ref} />
                </div>
            </div>
        );
    }
}

export default connect(
    state => state.profile,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Profile);

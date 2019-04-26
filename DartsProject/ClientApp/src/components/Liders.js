import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Liders';

class Liders extends Component {
    componentDidMount() {
        this.props.loadData();
    }

    render() {
        var topRates = this.props.info.rate && this.props.info.rate.map(r => <div className="lider-row clearfix"><div className="lider-left">{r.user}</div><div className="lider-right">{r.value}</div></div>);
        return (
            <div>
                <div className="lider-container">
                    <div className="cool-player-info-container">
                        <div className="lider-table-head">Лучший рейтинг</div>
                        {topRates}
                    </div>
                </div>
                <div className="lider-container">
                    <div className="cool-player-info-container">
                        <div className="lider-table-head">Главное - Эффективность</div>
                        
                    </div>
                </div>

                <div className="lider-container">
                    <div className="cool-player-info-container">
                        <div className="lider-table-head">Самый задротер</div>

                    </div>
                </div>

                <div className="lider-container">
                    <div className="cool-player-info-container">
                        <div className="lider-table-head">Лучшие стрелки</div>

                    </div>
                </div>

                <div className="lider-container">
                    <div className="cool-player-info-container">
                        <div className="lider-table-head">Зови меня Леголас</div>

                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => state.liders,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Liders);

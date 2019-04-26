import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Winner';
import UserNameBlock from './UserNameBlock';
import BulgeBlock from './BulgeBlock';
import GoBlock from './GoBlock';
import Avatar from './Avatar';

class Winner extends Component {
    constructor() {
        super();
    }


    render() {
        return (
            <div>
                Славься Джей, Славься Джей, Славься Джей!!!
            </div>
        );
    }
}

export default connect(
    state => state.winner,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Winner);

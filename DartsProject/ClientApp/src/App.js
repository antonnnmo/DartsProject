import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Users from './components/Users';
import Game from './components/Game';
import Login from './components/Login';
import Profile from './components/Profile';
import Winner from './components/Winner';
import Liders from './components/Liders';
import './site.css';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={Users} />
        <Route path='/activeGame' component={Game} />
        <Route path='/login' component={Login} />
        <Route path='/profile' component={Profile} />
        <Route path='/winner' component={Winner} />
        <Route path='/liders' component={Liders} />
  </Layout>
);

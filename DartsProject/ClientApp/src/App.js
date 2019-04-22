import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Users from './components/Users';
import Game from './components/Game';
import FetchData from './components/FetchData';
import './site.css';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={Users} />
        <Route path='/activeGame' component={Game} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
  </Layout>
);

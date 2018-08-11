import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import List from './components/list';
import Detail from './components/detail';
import CheckEmail from './components/check-email';

export default class Index extends Component {

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path='/transfer-in/list' component={List} />
            <Route path='/transfer-in/detail/:saleId' component={Detail} />
            <Route path='/transfer-in/check-email/:token' component={CheckEmail} />
          </Switch>
        </Router>
      </div>
    );
  }
}
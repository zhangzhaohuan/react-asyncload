import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import TabRouter from './tabRouter';
import BatchLog from '../Batch/components/batchLog';




import './assets/index.less';

export default class Index extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/batch/log" component={BatchLog}></Route>
            <Route path="/batch" component={TabRouter}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
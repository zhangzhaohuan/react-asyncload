/**
 * require.context()
 */
import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { features } from './app4/index';

export default class App4 extends Component {
  render() {
    console.log(features);
    return (
      <Router>
        <Switch>
          <Route path="/" component={null} />
          {features.map(feature => (
            <Route
              key={feature.path}
              path={feature.path}
              component={feature.component} />
          ))}
        </Switch>
      </Router>
    )
  }
}

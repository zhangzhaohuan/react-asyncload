import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import './App.css';
import store from '../store/index';
import VerifyTip from './verifyTip/verifyTip';
import NewMailVerify from './newMailVerify/newMailVerify';
import MailSearch from './mailSearch/mailSearch';

class App extends Component {
  render() {
    return (
      <div>
        <Provider {...store}>
          <div className="app">
            <VerifyTip />
            <NewMailVerify />
            <MailSearch />
          </div>
        </Provider>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { TopBar } from 'components';
import { Button } from '@ali/aps';
import { i18n } from 'common';
import { Route } from 'react-router-dom';
import LogList from './logList';
import LogDetail from './logDetail';
import LogHistoryList from './logHistoryList';
import LogHistoryDetail from './logHistoryDetail';
import './index.less';

export default class BatchLog extends Component {

  go = () => {
    const { history } = this.props;
    // history.push('/batch/info-modification');
    history.go(-1);
  }
  render() {
    return (
      <div className='batch-op-log'>
        <TopBar title={i18n('batch-op-log')}>
          <Button size="small" type="primary" onClick={this.go}
            style={{ padding: '0 5px' }}
          >{i18n('batch-op-log-back')}</Button>
        </TopBar>
        <Route path="/batch/log/list" component={LogList}></Route>
        <Route path="/batch/log/detail" component={LogDetail}></Route>
        <Route path="/batch/log/historyList" component={LogHistoryList}></Route>
        <Route path="/batch/log/historyDetail" component={LogHistoryDetail}></Route>
      </div>
    );
  }
}

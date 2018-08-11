import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import TabNav from '../tabNav';
import InfoModification from '../tabContent/InfoModification';
import DnsModification from '../tabContent/DnsModification';
import ProxyService from '../tabContent/ProxyService';
import TransferLock from '../tabContent/TransferLock';
import UpdateLock from '../tabContent/UpdateLock';
import { TopBar } from 'components';
import { i18n } from 'common';
import Register from '../tabContent/Register';
import Renewal from '../tabContent/Renewal';
import TransferIn from '../tabContent/TransferIn';
import './index.less';

export default class TabRouter extends Component {
  render() {
    return (
      <div>
        <TopBar title={i18n('sidebar-bulk-op')}>
          <Link to={'/batch/log/list'} className="aps-pull-right" >
            {i18n('batch-op-operation-records')}
          </Link>
        </TopBar>
        <TabNav />
        <Route path="/batch/info-modification" component={InfoModification}></Route>
        <Route path="/batch/proxy-service" component={ProxyService}></Route>
        <Route path="/batch/transfer-lock" component={TransferLock}></Route>
        <Route path="/batch/update-lock" component={UpdateLock}></Route>
        <Route path="/batch/dns-modification" component={DnsModification}></Route>
        <Route path="/batch/register" component={Register}></Route>
        <Route path="/batch/renewal" component={Renewal}></Route>
        <Route path="/batch/transfer-in" component={TransferIn}></Route>
      </div>
    );
  }
}
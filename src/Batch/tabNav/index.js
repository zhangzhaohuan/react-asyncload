import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'common';
import { Tabs } from '@ali/aps';
import './index.less';

const TabPanel = Tabs.TabPanel;
const tabs = [
  {
    path: '/batch/info-modification',
    title: i18n('sidemenu-domain-edit-info')
  },
  {
    path: '/batch/proxy-service',
    title: i18n('dns-privacy-protection-service')
  },
  {
    path: '/batch/transfer-lock',
    title: i18n('batch-op-transfer-lock')
  },
  {
    path: '/batch/update-lock',
    title: i18n('batch-op-no-update-lock')
  },
  {
    path: '/batch/dns-modification',
    title: i18n('sidemenu-domain-edit-dns')
  },
  {
    path: '/batch/register',
    title: i18n('batch-op-domain-name-registration')
  },
  {
    path: '/batch/renewal',
    title: i18n('batch-op-domain-renew')
  },
  {
    path: '/batch/transfer-in',
    title: i18n('batch-op-domain-transfer')
  }
];


export default class TabNav extends Component {

  renderTabItems() {
    return tabs.map(item => (
      <TabPanel key={item.path}
        label={<Link to={item.path} className="tabs">{item.title}</Link>}>
      </TabPanel>)
    );
  }

  render() {
    const currentUrl = location.hash.slice(1).split('?')[0];
    return <div className="tab_nav">
      <Tabs type="card" size="normal" tabAlign="left" activeKey={currentUrl}>
        {this.renderTabItems()}
      </Tabs>
    </div>;
  }
}
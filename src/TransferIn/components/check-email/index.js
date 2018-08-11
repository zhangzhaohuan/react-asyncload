import React, { Component } from 'react';
import { TopBar } from 'components';
import { i18n } from 'common';
import { model, binding } from 'mota';
import Model from './model';
import { Icon } from '@ali/aps';
import './index.less';

@model(Model)
@binding
export default class TransferCheckEmail extends Component {

  componentDidMount() {
    this.model.params.token = this.props.match.params.token;
    this.model.query();
  }

  renderSuccess() {
    const { failList = [], successList = [] } = this.model.data;
    return <div>
      <Icon type="info" className="icon" />
      {i18n('transfer-in-result-info', {
        successful: String(successList.length),
        failed: String(failList.length)
      })}
    </div>;
  }

  renderError() {
    const items = i18n('transfer-in-result-error').split('|');
    return <div>
      <Icon type="info" className="icon error" />
      {i18n('transfer-in-result-title')}
      <ul>
        {items.map(item => (<li>{item}</li>))}
      </ul>
    </div>;
  }

  render() {
    const { data, error } = this.model;
    return <div className='transfer-in-result'>
      <TopBar title={i18n('confirm-email-attr')}></TopBar>
      <div className="transfer-in-result-info">
        {error ? this.renderError() : null}
        {data ? this.renderSuccess() : null}
        <div style={{ padding: '10px 25px' }}>
          {i18n('you-can')} <a href="#/transfer-in/list">
            {i18n('go-to-domain-list')}
          </a>
        </div>
      </div>
    </div>;
  }

}

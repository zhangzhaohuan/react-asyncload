import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Input, Button, Select, DatePicker } from '@ali/aps';
import './mailSearch.less';
import ResultList from './resultList/resultList';
import i18n from '$i18n';
import listModel from '../../models/list';

@inject('listStore')
@observer
class MailSearch extends Component {
  constructor(props) {
    super(props);
    this.listStore = this.props.listStore;
    this.state = {
      stateOpts: [
        { text: `${i18n('all-email')}`, value: ' ' },
        { text: `${i18n('verif-pass')}`, value: '1' },
        { text: `${i18n('verif-ing')}`, value: '0' }
      ]
    };
  }
  handlerSearch() {
    listModel.changeCurrentPage(1);
    listModel.getResultList();
  }
  handlerChangeSelect(e) {
    listModel.changeVerificationStatus(e.target.value);
    //this.handlerSearch();
  }
  handlerChangeEmail(e) {
    listModel.changeEmail(e.target.value);
  }
  handlerChangeBeginTime(e) {
    listModel.changeBeginCreateTime(new Date(e.target.value).getTime());
    //this.handlerSearch();
  }
  handlerChangeEndTime(e) {
    listModel.changeEndCreateTime(new Date(e.target.value).getTime());
    //this.handlerSearch();
  }

  render() {
    const children = [];
    this.state.stateOpts.forEach((item) => {
      children.push(<Option key={item.value} value={item.value}>{item.text}</Option>);
    });
    const { beginCreateTime, endCreateTime } = this.props.listStore;
    return (
      <div>
        <div className="search-line">
          <div className="search-item">
            <label>{i18n('email-address') + '：'}</label>
            <Input
              className="email-input-box"
              size="medium"
              value={this.listStore.email}
              onChange={this.handlerChangeEmail.bind(this)} />
          </div>
          <div className="search-item add-time">
            <label>{i18n('add-time') + '：'}</label>
            <DatePicker value={beginCreateTime} onChange={this.handlerChangeBeginTime.bind(this)} />
            <span>—</span>
            <DatePicker value={endCreateTime} onChange={this.handlerChangeEndTime.bind(this)} />
          </div>
          <div className="search-item state-test">
            <label>{i18n('verif-status') + '：'}</label>
            <Select
              style={{ width: '160px' }}
              size="medium"
              value={this.listStore.verificationStatus}
              onChange={this.handlerChangeSelect.bind(this)}>
              {children}
            </Select>
          </div>
          <Button onClick={listModel.reset}>重置</Button>
          <Button
            className="search-btn"
            type="primary"
            onClick={this.handlerSearch.bind(this)} >{i18n('search')}</Button>
        </div>
        <ResultList />
        <p style={{ marginTop: 10 }}>{i18n('notice-email-list-bottom')}</p>
      </div>
    );
  }
}

export default MailSearch;
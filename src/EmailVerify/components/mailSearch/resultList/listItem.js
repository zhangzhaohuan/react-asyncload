import React, { Component } from 'react';
import { CheckBox, Table, notification } from '@ali/aps';
import { observer, inject } from 'mobx-react';
import VerifCode from '../../verifCode/verifCode';
import i18n from '$i18n';
import sdk from 'domain-sdk';


import verifyModel from '../../../models/verifyModel';
import itemModel from '../../../models/itemModel';

const Column = Table.Column;
const { Site } = sdk.components;

@inject('listStore', 'itemStore', 'verifCodeStore')
@observer
class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckAll: false,
      checkedList: [],
      email: ''
    };
    this.checkedList = [];

    this.itemStore = this.props.itemStore;
    this.listStore = this.props.listStore;
    this.verifCodeStore = this.props.verifCodeStore;
  }

  // 某一条的CheckBox状态
  handlerChangeListCheck(e) {

    this.checkedList.push(e.target.value);
    this.setState({
      checkedList: this.checkedList
    });
    this.listStore.resultList.forEach((item) => {
      if (item.email == e.target.value) {
        item.checked = e.target.checked;
      }
    });
    if (!e.target.checked) {
      this.setState({
        isCheckAll: false
      });
      itemModel.removeMailId(e.target.value);
    } else {
      itemModel.addMailId(e.target.value);
    }
    this.singleCheckAll();
  }

  // 全选
  handlerCheckAll() {
    this.setState({
      isCheckAll: !this.state.isCheckAll
    });
    this.props.list.forEach((item) => {
      item.checked = !this.state.isCheckAll;
    });
    if (!this.state.isCheckAll) {
      this.listStore.resultList.forEach((item) => {
        itemModel.addMailId(item.email);
      });
    } else {
      this.itemStore.mailIdArr = [];
    }
  }

  // 选中所有的checkbox
  singleCheckAll() {
    let isAll = this.listStore.resultList.every((item) => {
      return item.checked == true;
    });
    if (isAll) {
      this.setState({
        isCheckAll: true
      });
    }
  }

  // 删除某一项记录
  handlerDeleteItem(email) {
    this.setState({
      email: email
    });
    verifyModel.showCodeDialog();
  }

  // 重新发送某一条的验证
  async handlerReSendEmail(email) {
    const rs = await itemModel.reSendEmail(email);
    const { failList = [], successList = [] } = rs.data || {};
    notification.alert(<div>
      {successList.length > 0 ? <div>
        <div>{i18n('send-success-alert')}</div>
        <strong className="result-label">{i18n('email-success', {total: successList.length})}</strong> 
        <ul>
          {successList.map(item => <li>{item.email}</li>)}
        </ul>
      </div> : ''}
      {failList.length > 0 ? <div>
        <strong className="result-label">{i18n('email-failed', {total: failList.length})}</strong>
        <ul>
          {failList.map(item => <li>{item.email}:{item.message}</li>)}
        </ul>
      </div> : ''}
    </div>);
  }
  render() {
    return (
      <div>
        <Table data={this.listStore.resultList}>
          <Column
            field='email'
            key='col-email'
            align="left"
            head={() =>
              <span>
                <CheckBox
                  value="0"
                  checked={this.state.isCheckAll}
                  onChange={this.handlerCheckAll.bind(this)} />
                {i18n('email-address')}
              </span>}
            cell={({ value, row }) =>
              <span>
                <CheckBox
                  value={row.email}
                  checked={row.checked}
                  onChange={this.handlerChangeListCheck.bind(this)} />
                {`${value}`}
              </span>} />
          <Column
            field='gmtCreate'
            head={<span>{i18n('add-time')}<Site site="intl">(UTC)</Site></span>}
            key='col-time'
            align="left" />
          <Column
            field='stateText'
            head={i18n('verif-status')}
            key='col-state'
            align="left" />
          <Column
            field='stateNode'
            head={i18n('operate')}
            key='col-state'
            align="left"
            cell={({ value, row }) =>
              <div className="oparation-opt">
                {
                  row.verificationStatus != 1
                    ? <span>
                      <a href="javascript:;"
                        onClick={this.handlerReSendEmail.bind(this, row.email)}>
                        {i18n('resend-email')}
                      </a><br /><br />
                      <a href="javascript:;"
                        onClick={this.handlerDeleteItem.bind(this, row.email)}>{i18n('delete')}</a>
                    </span>
                    : <a href="javascript:;"
                      onClick={this.handlerDeleteItem.bind(this, row.email)}>{i18n('delete')}</a>
                }
                （ {value} ）
              </div>
            } />
        </Table>
        <VerifCode email={this.state.email} verifCodeStore={this.props.verifCodeStore} />
      </div>
    );
  }
}
export default ListItem;
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Pagination, Dialog, notification } from '@ali/aps';
import './resultList.less';
import ListItem from './listItem';
import i18n from '$i18n';

import listModel from '../../../models/list';
import verifyModel from '../../../models/verifyModel';
import itemModel from '../../../models/itemModel';

@inject('listStore', 'itemStore', 'verifCodeStore')
@observer
class ResultList extends Component {
  constructor(props) {
    super(props);
    this.itemStore = this.props.itemStore;
    this.listStore = this.props.listStore;
    this.verifCodeStore = this.props.verifCodeStore;
    this.passState = {
      '1': { // 验证通过
        'text': `${i18n('verif-pass')}`,
        'node': `${i18n('delete-reverification')}`
      },
      '0': { // 验证中
        'text': `${i18n('verif-ing')}`,
        'node': `${i18n('delete-reverification')}`
      }
    };
  }
  componentDidMount() {
    listModel.getResultList();
  }

  // 翻页
  handlerChangePage(pageIndex) {
    listModel.changeCurrentPage(pageIndex);
    listModel.getResultList();
  }

  // 批量删除
  handlerDeleteAll() {
    if (!this.itemStore.mailIdArr.length) {
      notification.alert(`${i18n('no-email-alert')}`);
    } else {
      verifyModel.showCodeDialog();
    }
  }

  // 批量重发邮件
  async handlerResendAll() {
    if (!this.itemStore.mailIdArr.length) {
      notification.alert(`${i18n('no-email-alert')}`);
    } else {
      const rs = await itemModel.reSendEmail();
      const { failList = [], successList = [] } = rs.data || {};
      notification.alert(<div>
        {successList.length > 0 ? <div>
          <div>{i18n('send-success-alert')}</div>
          <strong className="result-label">
            {i18n('email-success', { total: successList.length })}
          </strong>
          <ul>
            {successList.map(item => <li>{item.email}</li>)}
          </ul>
        </div> : ''}
        {failList.length > 0 ? <div>
          <strong className="result-label">
            {i18n('email-failed', { total: failList.length })}
          </strong>
          <ul>
            {failList.map(item => <li>{item.email}:{item.message}</li>)}
          </ul>
        </div> : ''}
      </div>);
    }
  }

  close() {
    itemModel.closeEmailSend();
  }
  render() {
    this.listStore.resultList.forEach((item) => {
      item.checked = false;
      item.stateText = this.passState[item.verificationStatus].text;
      item.stateNode = this.passState[item.verificationStatus].node;
    });
    return (
      <div className="result-list">
        <ListItem list={this.listStore.resultList} />
        {this.listStore.emptyList
          ? <p className="placeholder-content">{i18n('email-edit-no-email-found')}</p>
          : null
        }
        <div className="list-operation">
          <Button
            className="btn opration-btn" size="small" type="primary"
            onClick={this.handlerDeleteAll.bind(this)} >{i18n('delete-all')}</Button>
          <Button
            className="btn" size="small" type="primary"
            onClick={this.handlerResendAll.bind(this)} >{i18n('resend-email-all')}</Button>
        </div>
        <div className="list-pagination">
          <Pagination
            showTotal
            showSizeChanger
            showQuickJumper={true}
            defaultCurrent={this.listStore.currentPage}
            total={this.listStore.totalNum}
            style={{ margin: 0 }}
            onChange={this.handlerChangePage.bind(this)}
          />
        </div>
        <Dialog visible={this.itemStore.showEmailSend}
          title={i18n('tip')}
          buttons={[{ text: i18n('confirm'), type: 'primary' }]}
          style={{ width: 400 }}
          onOverlayClick={this.close.bind(this)}
          onButtonClick={this.close.bind(this)}
          onClose={this.close.bind(this)}>
          <span>{i18n('send-success-alert')}</span>
        </Dialog>
      </div>
    );
  }
}

export default ResultList;
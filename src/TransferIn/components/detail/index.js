import React, { Component } from 'react';
import { TopBar } from 'components';
import { i18n } from 'common';
import { site } from 'domain-sdk-common/utils';
import { Button, Grid, Alert, Steps, Input, Dialog, Icon } from '@ali/aps';
import { model, binding, watch } from 'mota';
import Model from './model';
import './index.less';
import sdk from 'domain-sdk';
const { Site } = sdk.components;
const { Row, Col } = Grid;
const Step = Steps.Step;

@model(Model)
@binding
export default class TransferDetail extends Component {

  componentDidMount() {
    this.model.init();
    this.model.params.saleId = this.props.match.params.saleId;
    this.model.paramsTransferCode.saleId = this.props.match.params.saleId;
    this.model.query();
  }

  refresh = () => {
    window.location.reload();
  }

  go = () => {
    const { history } = this.props;
    // history.push('/batch/info-modification');
    history.go(-1);
  }

  @watch(model => model.stepData)
  onChange() {
    this.forceUpdate();
  }
  render() {
    let gotoList = '//dc.console.aliyun.com/#/domain/list';  //国际
    site() == 'intl' ? '' : gotoList = '//netcn.console.aliyun.com/core/domain/list';
    let gotoTransfer = '//wanwang.aliyun.com/domain/transfers';    //国内
    site() == 'intl' ? gotoTransfer = i18n('transfer-in-goto-transfer') : '';
    let data = this.model.stepData;
    const steps = data.map((s, i) => {
      return (
        <Step
          key={i}
          status={s.status}
          title={s.title}
        />
      );
    });

    const renderStatusItem = () => {
      switch (this.model.simpleTransferInStatus) {
        case 'FAIL':
          return <div className='content fail'
          ><Icon type="info" />
            <p>{i18n('transfer-in-detail-fail-unfortunate')}</p>
            <p>{i18n('transfer-in-detail-fail-back')}</p>
            <span>{`${i18n('transfer-in-detail-reason')}: ${this.model.resultMsg}`}</span><br /><br />
            <span style={{ color: '#000' }}>{i18n('transfer-in-detail-can')} :
          <a href={gotoList}>{i18n('transfer-in-detail-enter')}</a>
              {i18n('transfer-in-or')}
              <a href={gotoTransfer} target="_blank" >{i18n('transfer-in-keep')}</a>
            </span>
          </div>;
        case 'SUCCESS':
          return <div className='content success'
          >
            <Icon type="info" />
            <p> {i18n('transfer-in-detail-success')}</p>
            <span style={{ color: '#000' }}>{i18n('transfer-in-detail-can')} :
            <a href={gotoList}>{i18n('transfer-in-detail-enter')}</a>
              {i18n('transfer-in-or')}
              <a href={gotoTransfer} target="_blank">{i18n('transfer-in-keep')}</a>
            </span>
          </div>;
        case 'PASSWORD_VERIFICATION':
          return <div>
            <div className='content pw-verify'>
              <Icon type="info" />
              <p>{i18n('transfer-in-exprise')}&nbsp;{this.model.expireDate}<Site site="intl">(UTC)</Site>
                {i18n('transfer-in-othervise')}</p>
              <br />
              <p className='danger'>{i18n('transfer-in-detail-sorry')}</p>
              <div>
                <span>{`${i18n('transfer-in-detail-pw')} : `}</span>
                <Input data-bind='paramsTransferCode.transferCode' />
                <Button onClick={this.model.queryTransferCode}
                  disabled={this.model.paramsTransferCode.transferCode == ''}
                  type='primary'>{i18n('transfer-in-detail-validation')}
                </Button>
              </div>

            </div>
            <hr />
            <div className='content'>
              <span>{i18n('transfer-in-detail-no-network')}
                <a href='javascript:void(0)' onClick={this.model.cancle}>{i18n('transfer-in-cancle')}</a>
              </span>
            </div>
          </div>;
        case 'AUTHORIZATION':
          return <div>
            <div className='content' >
              <Icon type="info" />
              <p>{i18n('transfer-in-exprise')}&nbsp;{this.model.expireDate}<Site site="intl">(UTC)</Site>
                {i18n('transfer-in-expire-tip')}</p>
              <p>{i18n('transfer-in-policy')}</p>
              {
                this.model.email == '' ?
                  <div>
                    <p className='danger'>{i18n('transfer-in- email-blank')}</p>
                    <ul>
                      <li>{i18n('transfer-in-detail-if-through')}
                        <a hrer='javascript:void(0)' onClick={this.model.whiosQuery}>whois</a>
                        {i18n('transfer-in-detail-email-exits-correct')}
                        <a hrer='javascript:void(0)' onClick={this.model.retrieveEmail}>
                          {i18n('transfer-in-retrieve-email')}
                        </a>
                      </li>
                      <li>{i18n('transfer-in-detail-manual-processing')}</li>
                    </ul>
                  </div> :
                  <div>
                    <p>{`${i18n('transfer-in-email-address')}${this.model.email}`}</p>
                    <ul>
                      <li>{`${i18n('transfer-in-email-incorrect')}`}
                        <a href='javascript:void(0)' onClick={this.model.retrieveEmail}>
                          {i18n('transfer-in-detail-send')}</a>
                      </li>
                      <li>{i18n('transfer-in-detail-verify-email')}
                        <a href='javascript:void(0)' onClick={this.model.resendEmail} >
                          {i18n('transfer-in-detail-correct-resend')}</a>
                      </li>
                    </ul>
                    <Dialog visible={this.model.showTipSendEmail}
                      title={i18n('transfer-in-detail-message')}
                      buttons={[{ text: i18n('confirm'), type: 'primary' }]}
                      style={{ width: 500 }}
                      onOverlayClick={this.model.close}
                      onButtonClick={this.model.onMesBtnClick}
                      onClose={this.model.closeMes}>
                      <span>{i18n('transfer-in-detail-message-content')}</span>
                    </Dialog>
                  </div>

              }
            </div>
            <hr />
            <div className='content'>
              <span>{i18n('transfer-in-detail-no-network')}
                <a href='javascript:void(0)' onClick={this.model.cancle}>{i18n('transfer-in-cancle')}</a>
              </span>
            </div>

          </div>;
        case 'INIT':
          return <div>
            <div className='content' >
              <Icon type="info" />
              <p>{i18n('transfer-in-exprise')}&nbsp;{this.model.expireDate}
                <Site site="intl">(UTC)</Site>
                {i18n('transfer-in-expire-tip')}</p>
              <p className='danger'>{i18n('transfer-in-detail-init')}</p>
            </div>
            <hr />
            <div className='content' >
              <span>{i18n('transfer-in-detail-no-network')}
                <a href='javascript:void(0)' onClick={this.model.cancle}>{i18n('transfer-in-cancle')}</a>
              </span>
            </div>
          </div>;
        case 'PENDING':
          return <div>
            <div className='content PENDING' >
              <Icon type="bang" />
              <p className='danger'>{i18n('transfer-in-detail-passed-pw')} {this.model.gmtModified}
                {i18n('transfer-in-detail-begin')} </p>
              <p>
                <Alert type="warning">
                  <h5>{i18n('transfer-in-detail-warm-tips')}</h5>
                  <p>{i18n('transfer-in-detail-warm-one')}</p>
                  <p>{i18n('transfer-in-detail-warm-two')}</p>
                </Alert>
              </p>
            </div>
            <hr />
            <div className='content' >
              <span>{i18n('transfer-in-detail-no-network')}
                <a href='javascript:void(0)' onClick={this.model.cancle}>{i18n('transfer-in-cancle')}</a>
              </span>
            </div>
          </div>;
        case 'NAME_VERIFICATION':
          return <div>
            <div className='content' >
              <Icon type="info" />
              <p>{i18n('transfer-in-exprise')}&nbsp;{this.model.expireDate}<Site site="intl">(UTC)</Site>
              {i18n('transfer-in-expire-tip')}</p>
              <p>{i18n('transfer-in-policy')}
                <a href='//help.aliyun.com/knowledge_detail/41880.html' target="_blank">什么是命名审核？</a>
              </p>
              <p className='danger'>{i18n('transfer-in-detail-name-tip')}</p>
            </div>
            <hr />
            <div className='content' >
              <span>{i18n('transfer-in-detail-no-network')}
                <a href='javascript:void(0)' onClick={this.model.cancle}>{i18n('transfer-in-cancle')}</a>
              </span>
            </div>
          </div>;

      }
    };

    return (
      <div className='transfer-in-detail'>
        <TopBar title={i18n('transfer-in-detail')}>
          <Button size="small" type="primary" onClick={this.go}
            style={{ padding: '0 5px' }}
          >{i18n('batch-op-log-back')}</Button>
          <Button size="small" type="normal" onClick={this.refresh}
            style={{ float: 'right', padding: '0 5px' }}
          >{i18n('refresh')}</Button>
        </TopBar>
        <Grid cellPadding={10} fluid={true}>
          <Row>
            <Col span={24}>
              <Alert type="success">{`${i18n('transfer-in-current-domain')} : ${this.model.domainName}`}</Alert>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Steps type="arrow" size="small">
                {steps}
              </Steps>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {
                renderStatusItem()
              }
              {/* <div className='content fail'
                style={this.model.simpleTransferInStatus == 'FAIL' ? { display: 'block' } : { display: 'none' }}>
                {i18n('transfer-in-detail-fail-unfortunate')}<br /><br />
                {i18n('transfer-in-detail-fail-back')}<br />
                <span>{`${i18n('transfer-in-detail-reason')}: ${this.model.resultMsg}`}</span><br /><br />
                <span style={{ color: '#000' }}>{i18n('transfer-in-detail-can')} :
                  <a href={gotoList}>{i18n('transfer-in-detail-enter')}</a>
                  {i18n('transfer-in-or')}
                  <a href={gotoTransfer} target="_blank" >{i18n('transfer-in-keep')}</a>
                </span>
              </div>
              <div className='content success'
                style={this.model.simpleTransferInStatus == 'SUCCESS' ? { display: 'block' } : { display: 'none' }}>
                {i18n('transfer-in-detail-success')}<br /><br />
                <span style={{ color: '#000' }}>{i18n('transfer-in-detail-can')} :
                  <a href={gotoList}>{i18n('transfer-in-detail-enter')}</a>
                  {i18n('transfer-in-or')}
                  <a href={gotoTransfer} target="_blank">{i18n('transfer-in-keep')}</a>
                </span>
              </div>
              <div style={this.model.simpleTransferInStatus == 'PASSWORD_VERIFICATION' ?
                { display: 'block' } : { display: 'none' }}>
                <div className='content pw-verify'>
                  <p>{i18n('transfer-in-exprise')}&nbsp;{this.model.expireDate}
                    {i18n('transfer-in-othervise')}</p>
                  <br />
                  <p className='danger'>{i18n('transfer-in-detail-sorry')}</p>
                  <div>
                    <span>{`${i18n('transfer-in-detail-pw')} : `}</span>
                    <Input data-bind='paramsTransferCode.transferCode' />
                    <Button onClick={this.model.queryTransferCode}
                      disabled={this.model.paramsTransferCode.transferCode == ''}
                      type='primary'>{i18n('transfer-in-detail-validation')}
                    </Button>
                    <Dialog visible={this.model.showTipTransferCode}
                      title={i18n('transfer-in-detail-message')}
                      buttons={[{ text: i18n('confirm'), type: 'primary' }]}
                      style={{ width: 500 }}
                      onOverlayClick={this.model.close}
                      onButtonClick={this.model.onPwBtnClick}
                      onClose={this.model.closePw}>
                      <span>{i18n('transfer-in-detail-password')}</span>
                    </Dialog>
                  </div>

                </div>
                <hr />
                <div className='content'>
                  <span>{i18n('transfer-in-detail-no-network')}
                    <a href='javascript:void(0)' onClick={this.model.cancle}>{i18n('transfer-in-cancle')}</a>
                  </span>
                </div>
              </div>
              <div style={this.model.simpleTransferInStatus == 'AUTHORIZATION' ?
                { display: 'block' } : { display: 'none' }} >
                <div className='content' >
                  <p>{i18n('transfer-in-exprise')}&nbsp;{this.model.expireDate}{i18n('transfer-in-expire-tip')}</p>
                  <p>{i18n('transfer-in-policy')}</p>
                  {
                    this.model.email == '' ?
                      <div>
                        <p className='danger'>{i18n('transfer-in- email-blank')}</p>
                        <ul>
                          <li>{i18n('transfer-in-detail-if-through')}
                            <a hrer='javascript:void(0)' onClick={this.model.whiosQuery}>whois</a>
                            {i18n('transfer-in-detail-email-exits-correct')}
                            <a hrer='javascript:void(0)' onClick={this.model.retrieveEmail}>
                              {i18n('transfer-in-retrieve-email')}
                            </a>
                          </li>
                          <li>{i18n('transfer-in-detail-manual-processing')}</li>
                        </ul>
                      </div> :
                      <div>
                        <p>{`${i18n('transfer-in-email-address')}${this.model.email}`}</p>
                        <ul>
                          <li>{`${i18n('transfer-in-email-incorrect')}`}
                            <a href='javascript:void(0)' onClick={this.model.retrieveEmail}>
                              {i18n('transfer-in-detail-send')}</a>
                          </li>
                          <li>{i18n('transfer-in-detail-verify-email')}
                            <a href='javascript:void(0)' onClick={this.model.resendEmail} >
                              {i18n('transfer-in-detail-correct-resend')}</a>
                          </li>
                        </ul>
                        <Dialog visible={this.model.showTipSendEmail}
                          title={i18n('transfer-in-detail-message')}
                          buttons={[{ text: i18n('confirm'), type: 'primary' }]}
                          style={{ width: 500 }}
                          onOverlayClick={this.model.close}
                          onButtonClick={this.model.onMesBtnClick}
                          onClose={this.model.closeMes}>
                          <span>{i18n('transfer-in-detail-message-content')}</span>
                        </Dialog>
                      </div>

                  }
                </div>
                <hr />
                <div className='content'>
                  <span>{i18n('transfer-in-detail-no-network')}
                    <a href='javascript:void(0)' onClick={this.model.cancle}>{i18n('transfer-in-cancle')}</a>
                  </span>
                </div>

              </div>
              <div style={this.model.simpleTransferInStatus == 'INIT' ?
                { display: 'block' } : { display: 'none' }} >
                <div className='content' >
                  <p>{i18n('transfer-in-exprise')}&nbsp;{this.model.expireDate}{i18n('transfer-in-expire-tip')}</p>
                  <p className='danger'>{i18n('transfer-in-detail-init')}</p>
                </div>
                <hr />
                <div className='content' >
                  <span>{i18n('transfer-in-detail-no-network')}
                    <a href='javascript:void(0)' onClick={this.model.cancle}>{i18n('transfer-in-cancle')}</a>
                  </span>
                </div>
              </div>

              <div style={this.model.simpleTransferInStatus == 'PENDING' ?
                { display: 'block' } : { display: 'none' }} >
                <div className='content' >
                  PENDING
                </div>
                <hr />
                <div className='content' >
                  PENDING
                </div>
              </div>
              <div style={this.model.simpleTransferInStatus == 'NAME_VERIFICATION' ?
                { display: 'block' } : { display: 'none' }} >
                <div className='content' >
                  <p>{i18n('transfer-in-exprise')}&nbsp;{this.model.expireDate}{i18n('transfer-in-expire-tip')}</p>
                  <p>{i18n('transfer-in-policy')}
                    <a href='//help.aliyun.com/knowledge_detail/41880.html' target="_blank">什么是命名审核？</a>
                  </p>
                  <p className='danger'>{i18n('transfer-in-detail-name-tip')}</p>
                </div>
                <hr />
                <div className='content' >
                  <span>{i18n('transfer-in-detail-no-network')}
                    <a href='javascript:void(0)' onClick={this.model.cancle}>{i18n('transfer-in-cancle')}</a>
                  </span>
                </div>
              </div> */}
              {/* <span style={{ color: '#000' }}>{i18n('transfer-in-detail-can')} :
                    <a href='https://netcn.console.aliyun.com/core/domain/list'>{i18n('transfer-in-detail-enter')}</a>
                    {i18n('transfer-in-or')}
                    <a href='https://wanwang.aliyun.com/domain/transfers'>{i18n('transfer-in-keep')}</a>
                  </span><br /> */}
              <Dialog visible={this.model.visible}
                title={i18n('transfer-in-cancle')}
                buttons={[{ text: i18n('transfer-in-determine-to-cancel') },
                { text: i18n('transfer-in-continue'), type: 'primary' }]}
                style={{ width: 500 }}
                onOverlayClick={this.model.close}
                onButtonClick={this.model.onBtnClick}
                onClose={this.model.close}>
                <span>{`${i18n('transfer-in-confirm-cancel-transfer')} "${this.model.domainName}" ？
                ${i18n('transfer-in-careful-cancel')}`}</span>
              </Dialog>
              <Dialog visible={this.model.showTipTransferCode}
                title={i18n('transfer-in-detail-message')}
                buttons={[{ text: i18n('confirm'), type: 'primary' }]}
                style={{ width: 500 }}
                onOverlayClick={this.model.close}
                onButtonClick={this.model.onPwBtnClick}
                onClose={this.model.closePw}>
                <span>{i18n('transfer-in-detail-password')}</span>
              </Dialog>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

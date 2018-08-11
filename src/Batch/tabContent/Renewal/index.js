import React, { Component } from 'react';
import { Grid, RadioGroup, Button, Input, CheckBox, Dialog, Upload, Select, Alert } from '@ali/aps';
import { model, binding } from 'mota';
import { i18n } from 'common';
import { site } from 'domain-sdk-common/utils';
import IdentifyEmail from '../../components/identifyEmail';
import IdentifyTel from '../../components/identifyTel';

import BatchRenewalModel from '../../models/Renewal';

const Row = Grid.Row;
const Col = Grid.Col;
const Option = Select.Option;
const children = [];

for (let i = 1; i < 11; i++) {
  children.push(<Option value={i}>{i}{i18n('batch-op-year')}</Option>);
}

@model(BatchRenewalModel)
@binding

export default class BatchRenewal extends Component {
  componentDidMount() {
    this.model.getOnceToken();
    // this.model.getUserEmail();
  }
  componentDidUpdate() {
    this.model.judgmentToSubmit();
  }

  render() {
    // const changeBtnText = this.model.data.timerCount > 0 ?
    //   this.model.data.timerCount + 's' :
    //   i18n('get-verifycode');
    return (
      <Grid cellPadding={10} fluid={true} className='batch-table'>
        <Row className='bulk-op-item'>
          <Col md={24}>
            <p>{i18n('warm-tip')}:</p>
            <ol style={{ marginLeft: '15px' }}>{i18n('review-tips').split('\n').map(str => (<li>{str}</li>))}</ol>
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col span={24}>
            <Alert type="warning">{i18n('batch-op-renew-one')}</Alert>
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col span={6} className='batch-lenged'>
            <label>{i18n('batch-op-renewal-uniform-years')}:</label>
          </Col>
          <Col span={18}>
            <Select
              defaultValue={`1${i18n('batch-op-year')}`} data-bind="data.defaultRenewalaTerm">
              {children}
            </Select>
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col span={6} className='batch-lenged'>
            <label htmlFor="">{i18n('batch-method')}:</label>
          </Col>
          <Col span={18}>
            <RadioGroup
              data-bind="data.valueBatchMethod"
              items={this.model.data.itemsBatchMethod}>
            </RadioGroup>
          </Col>
        </Row>
        <Row style={this.model.data.valueBatchMethod == `${i18n('custom-domain')}` ?
          { display: 'block' } : { display: 'none' }}>
          <Col span={6} className='batch-lenged'>
            <label htmlFor="">{i18n('domain-list')}:</label>
          </Col>
          <Col span={18}>
            <Input multiple rows={10} data-bind='data.domainList'
              placeholder={i18n('batch-op-please-input-domain-name')} style={{ width: '280px' }} />
            <p>{i18n('batch-op-enter-domain')}
              {` ${this.model.domainNumber} `}
              {i18n('batch-op-can-also-input')}{` ${this.model.leaveDomainNumber} `}{i18n('batch-op-a-domain')}</p>
          </Col>
        </Row>
        <Row style={this.model.data.valueBatchMethod == `${i18n('upload-file')}` ?
          { display: 'block' } : { display: 'none' }}>
          <Col span={6} className='batch-lenged'>
            <label htmlFor="">{i18n('select-file')}:</label></Col>
          <Col span={18}>
            <Upload url={'/BatchOperationApi/upload.json'}
              name="fileToUpload"
              text={i18n('batch-op-select-files')}
              onDone={this.model.onDone} />
            <p>{i18n('batch-op-upload-file-tip')}</p>
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col span={24} style={{ padding: 0 }}>
            {
              site() == 'intl' ? (<IdentifyEmail onChange={this.model.vCodeChange}
                url='/BatchOperationApi/sendAuthCodeForRenew.json' />) :
                (<IdentifyTel onChange={this.model.vCodeChange}
                  url='/BatchOperationApi/sendAuthCodeForRenew.json' />)
            }
          </Col>
        </Row>
        {/* <Row className='bulk-op-item'>
          <Col md={6} className='batch-lenged'>
            <label>{i18n('batch-op-email-security-authentication')}:</label>
          </Col>
          <Col md={18}>
            <span>{this.model.data.emailAdd}</span>
            <Button
              size="small"
              type="normal"
              disabled={this.model.data.timerCount > 0}
              onClick={this.model.getCode} >
              {changeBtnText}
            </Button>
          </Col>
        </Row> */}
        {/* <Row className='bulk-op-item'>
          <Col className='bulk-op-item-right' md={6} className='batch-lenged'>
            <label>{i18n('batch-op-email-verifycode')} : </label>
          </Col>
          <Col md={18}>
            <Input placeholder={i18n('sms-verifycode')}
              data-bind="params.vCode" style={{ width: '280px' }}
            />
          </Col>
        </Row> */}
        <Row className='bulk-op-item'>
          <Col span={6}>
          </Col>
          <Col span={18}>
            <label><CheckBox
              onChange={this.model.privacyProtectionTermsChange} />
              {i18n('batch-op-avoid-renewal-multiple-times')}
            </label>
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col span={6}>
          </Col>
          <Col span={18}>
            <label><CheckBox onChange={this.model.serviceTermsChange}
              id='batch-op-read-accept' />{i18n('batch-op-read-accept')}</label>&nbsp;
            {site() == 'intl' ? <a target="_blank"
              href={i18n('batch-op-common-terms')}
              target="_blank"
            >
              {i18n('batch-op-common-term-content')}</a> :
              <a href=
    'http://terms.aliyun.com/legal-agreement/terms/suit_bu1_ali_cloud/suit_bu1_ali_cloud201703141056_13782.html'
                target="_blank" >
                《域名服务条款》</a>
            }
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col span={9}></Col>
          <Col span={15}>
            <Button onClick={this.model.submit}
              disabled={this.model.data.submitDisabled}
            >{i18n('email-submit')}</Button>
            <Dialog visible={this.model.data.visible}
              title={i18n('tip')}
              buttons={[{ text: i18n('cancel') }, { text: i18n('confirm'), type: 'primary' }]}
              style={{ width: 500 }}
              onOverlayClick={this.model.close}
              onButtonClick={this.model.onBtnClick}
              onClose={this.model.close}>
              <span>{this.model.data.error_tipMessage}</span>
            </Dialog>
            <Dialog visible={this.model.data.successVisible}
              title={i18n('warm-tip')}
              buttons={[{ text: i18n('confirm'), type: 'primary' }]}
              style={{ width: 500 }}
              onOverlayClick={this.model.successTipClose}
              onButtonClick={this.model.onSuccessTipBtnClick}
              onClose={this.model.successTipClose}>
              <span>{i18n('batch-op-submit-success-tip-message')}</span>
            </Dialog>
          </Col>
        </Row>
      </Grid>
    );
  }
}
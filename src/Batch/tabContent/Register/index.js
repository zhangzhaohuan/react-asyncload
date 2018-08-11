import React, { Component } from 'react';
import { Grid, RadioGroup, Button, Input, CheckBox, Dialog, Select, Upload } from '@ali/aps';
import { model, binding, watch } from 'mota';
import { i18n } from 'common';
import BulkRegisterModel from '../../models/bulkRegisterModel';
import { site } from 'domain-sdk-common/utils';
import IdentifyEmail from '../../components/identifyEmail';
import IdentifyTel from '../../components/identifyTel';

import * as sdk from 'common/sdk';

const { ContactTemplate } = sdk.components;
const Row = Grid.Row;
const Col = Grid.Col;
const Option = Select.Option;
const children = [];

for (let i = 1; i < 11; i++) {
  children.push(<Option value={i}>{i}{i18n('batch-op-year')}</Option>);
}

@model(BulkRegisterModel)
@binding

export default class BulkRegister extends Component {
  componentDidMount() {
    this.model.getOnceToken();
    // this.model.getUserEmail();
  }
  componentDidUpdate() {
    this.model.judgmentToSubmit();
  }


  @watch(model => model.params.vCode)
  onChange() {
    this.model.judgmentToSubmit();
  }
  render() {
    // let knowMoreUrl = '//www.alibabacloud.com/help/doc-detail/62839.htm';
    let knowMoreUrl = i18n('infoTemplate-learn-more');
    site() == 'intl' ? '' : knowMoreUrl = '//help.aliyun.com/document_detail/62839.html';
    return (
      <Grid cellPadding={10} fluid={true} className='batch-table'>
        <Row className='bulk-op-item'>
          <Col md={24}>
            <p>{i18n('warm-tip')}:</p>
            <ol style={{ marginLeft: '15px' }}>{i18n('review-tips').split('\n').map(str => (<li>{str}</li>))}</ol>
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
          <Col span={24}>
            <p>
              {i18n('bath-op-choose- registrant-profile')}
            </p>
            <p>{i18n('batch-op-policy-requirements-example')}<a href={knowMoreUrl} target="_blank">
              {i18n('know-more')}</a></p>
            <p>{i18n('batch-op-policy-requirements-example-two-small')}</p>
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col span={24}>
            <ContactTemplate onSelect={this.model.onSelect} noRealName />
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
          <Col md={6} className='batch-lenged'>
            <label>{i18n('batch-op-email-verifycode')} : </label>
          </Col>
          <Col md={18}>
            <Input placeholder={i18n('sms-verifycode')}
              data-bind="params.vCode" style={{ width: '280px' }}
            />
          </Col>
        </Row> */}
        <Row className='bulk-op-item'>
          <Col span={24} style={{ padding: 0 }}>
            {
              site() == 'intl' ? (<IdentifyEmail onChange={this.model.vCodeChange}
                url='/BatchOperationApi/sendAuthCodeForActivate.json' />) :
                (<IdentifyTel onChange={this.model.vCodeChange}
                  url='/BatchOperationApi/sendAuthCodeForActivate.json' />)
            }
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col span={6}>
          </Col>
          <Col span={18}>
            <label><CheckBox
              onChange={this.model.privacyProtectionTermsChange}
              id='batch-op-read-accept' />{i18n('batch-op-read-accept')}</label>
            {site() == 'intl' ? <a target="_blank"
              href={i18n('batch-op-domain-name-privacy-policy-address')}
            >
              &nbsp;{i18n('bath-op-dns-privacy-protection-service-terms')}</a> :
              <a href=
      'http://terms.aliyun.com/legal-agreement/terms/suit_bu1_ali_cloud/suit_bu1_ali_cloud201703061733_85034.html'
                target="_blank" >
                《域名隐私保护服务条款》</a>
            }

            <p>{i18n('batch-op-open-and-close-at-any-time')}
              {
                site() == 'intl' ?
                  <a target="_blank" href={i18n('batch-op--learn-more-add')}>{i18n('know-more')}</a> :
                  <a target="_blank"
                    href='https://help.aliyun.com/knowledge_detail/35825.html'>
                    {i18n('know-more')}</a>
              }
            </p>
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col span={6}>
          </Col>
          <Col span={18}>
            <label><CheckBox checked={this.model.data.domainProtect} onChange={this.model.domainProtectChange}
              id='batch-op-transferProhibited' />{i18n('batch-op-i-agree-to-open-it')}</label>
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
          <Col span={6}></Col>
          <Col span={18}>
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
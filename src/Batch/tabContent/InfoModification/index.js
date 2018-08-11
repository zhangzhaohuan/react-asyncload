import React, { Component } from 'react';
import {
  Grid, CheckBoxGroup, CheckBox, Button, Dialog, RadioGroup
} from '@ali/aps';
import { model, binding } from 'mota';
import Model from '../../models/InfoModification';
import { i18n } from 'common';
import * as sdk from 'common/sdk';
import { site } from 'domain-sdk-common/utils';
import querystring from 'querystring';
import BatchMethod from '../../components/batchMethod';
import BatchMethodCN from '../../components/batchMethodCN';
import IdentifyEmail from '../../components/identifyEmail';
import IdentifyTel from '../../components/identifyTel';
import IdentifyApp from '../../components/identifyApp';

import './index.less';

const { ContactTemplate } = sdk.components;
const Row = Grid.Row;
const Col = Grid.Col;

@model(Model)
@binding
export default class DnsInfo extends Component {
  componentWillMount() {
    const { location } = this.props;
    if (location && location.search) {
      const query = querystring.parse(location.search.slice(1));
      this.model.data.querydomains = (query.domains || '').split(',')
        .join('\r\n');
    }
  }
  componentDidMount() {
    this.model.init();
    this.model.getOnceToken();
  }

  componentDidUpdate() {
    this.model.identificateSubmit();
  }


  // @watch(model => model.)
  // onChange() {
  render() {
    // let knowMoreUrl = '//www.alibabacloud.com/help/doc-detail/62839.htm';
    let knowMoreUrl = i18n('infoTemplate-learn-more');
    site() == 'intl' ? '' : knowMoreUrl = '//help.aliyun.com/document_detail/62839.html';
    return (
      <Grid className='batch-table' cellPadding={10} fluid={true}>
        <Row className='bulk-op-item'>
          <Col span={24} style={{ padding: 0 }}>
            {
              site() == 'cn' ? (<BatchMethodCN getData={this.model.getBatchMethodData}
                domains={this.model.data.querydomains} />) :
                (<BatchMethod getData={this.model.getBatchMethodData}
                  domains={this.model.data.querydomains} />)
            }
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col className='batch-lenged' span={6}>
            <label htmlFor="">{i18n('select-modify-domain-information')} : </label>
          </Col>
          <Col span={2}>
            <CheckBox checked={this.model.allSelectStatus} onChange={this.model.checkBoxChange} />
            <label>{i18n('batch-op-select-all')}</label>
          </Col>
          <Col span={16} className="changeStyle">
            <CheckBoxGroup items={this.model.data.updateDominInfoItems}
              data-bind='data.updateDominInfoValue'>
            </CheckBoxGroup>
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col span={24}>
            <p>
              {i18n('bath-op-choose- registrant-profile')}
            </p>
            <p>{i18n('batch-op-policy-requirements-example')}<a href={knowMoreUrl} target="_blank">
              {i18n('know-more')}</a></p>
            <p>{i18n('batch-op-policy-requirements-example-two')}</p>
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col span={24}>
            <ContactTemplate onSelect={this.model.onSelect} />
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col span={24} style={{ padding: 0 }}>
            <Row className='bulk-op-item'>
              <Col span={24} style={{ padding: 0 }}>
                {
                  site() == 'intl' ? (<IdentifyEmail onChange={this.model.vCodeChange}
                    url='/ContactApi/SendAuthCode.json' />) :
                    (<div className="batch-op-in-col">
                      <Grid fluid={true}>
                        <Row className='bulk-op-item'>
                          <Col className='batch-lenged' span={6}>
                            <label htmlFor="">{i18n('batch-op-verification-mode')} : </label>
                          </Col>
                          <Col span={18}>
                            <RadioGroup
                              data-bind="data.valueVerificationMode"
                              items={this.model.data.itemsVerificationMode}>
                            </RadioGroup>
                          </Col>
                        </Row>
                        {/* <Row className='bulk-op-item'
                          style={this.model.data.valueVerificationMode == `${i18n('phone-authentication')}` ?
                            { display: 'block' } : { display: 'none' }}>
                          <Col span={24} style={{ padding: 0 }}>
                            <IdentifyTel onChange={this.model.vCodeChange} url='/ContactApi/SendAuthCode.json' />
                          </Col>
                        </Row>
                        <Row className='bulk-op-item'
                          style={this.model.data.valueVerificationMode == `${i18n('app-authentication')}` ?
                            { display: 'block' } : { display: 'none' }}>
                          <Col span={24} style={{ padding: 0 }}>
                            <IdentifyApp onChange={this.model.ivTokenChange}
                              noChecked={this.model.data.valueVerificationMode == `${i18n('phone-authentication')}`} />
                          </Col>
                        </Row> */}
                        <Row className='bulk-op-item'>
                          <Col span={24} style={{ padding: 0 }}>
                            {
                              this.model.data.valueVerificationMode == `${i18n('phone-authentication')}` ?
                                <IdentifyTel onChange={this.model.vCodeChange} url='/ContactApi/SendAuthCode.json' /> :
                                <IdentifyApp onChange={this.model.ivTokenChange} />
                            }
                          </Col>
                        </Row>
                      </Grid>
                    </div>)
                }
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col span={6}>
          </Col>
          <Col span={18}>
            <label><CheckBox checked={this.model.data.transferProhibited} onChange={this.model.transferProhibitedChange}
              id='batch-op-transferProhibited' />{i18n('batch-op-close-domain-information-modify')}</label>
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col span={6}>
          </Col>
          <Col span={18}>
            <label><CheckBox onChange={this.model.serviceTermsChange}
              id='batch-op-read-accept' />{i18n('batch-op-read-accept')}</label>&nbsp;
            {site() == 'intl' ? (<a target="_blank"
              href={i18n('batch-op-info-terms')}
              target="_blank"
            >
              {i18n('batch-op-domain-serve-terms')}</a>) :
              (<a href=
    'http://terms.aliyun.com/legal-agreement/terms/SD/SD201612020859_86060.html'
                target="_blank" >
                《域名信息修改服务条款》</a>)
            }
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col span={6}>
          </Col>
          <Col span={18}><Button disabled={this.model.data.submitDisabled}
            onClick={this.model.submit}>{i18n('email-submit')}</Button>
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

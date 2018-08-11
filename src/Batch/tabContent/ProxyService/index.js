import React, { Component } from 'react';
import { model, binding, watch } from 'mota';
import { Grid, RadioGroup, CheckBox, Button, Dialog } from '@ali/aps';
import Model from '../../models/ProxyService';
import { i18n } from 'common';
import { site } from 'domain-sdk-common/utils';
import querystring from 'querystring';
import BatchMethod from '../../components/batchMethod';
import BatchMethodCN from '../../components/batchMethodCN';
import IdentifyEmail from '../../components/identifyEmail';
import IdentifyTel from '../../components/identifyTel';

const Row = Grid.Row;
const Col = Grid.Col;

@model(Model)
@binding
export default class PrivacyProtection extends Component {
  componentWillMount() {
    const { location } = this.props;
    if (location && location.search) {
      const query = querystring.parse(location.search.slice(1));
      this.model.data.querydomains = (query.domains || '').split(',')
        .join('\r\n');
    }
  }
  componentDidMount() {
    this.model.getOnceToken();
    console.log(this.model.params);

  }

  componentDidUpdate() {
    this.model.identificateSubmit();
  }

  @watch(model => model.params)
  onChange() {
    this.model.identificateSubmit();
  }

  render() {
    return (
      <Grid className='batch-table' cellPadding={10} fluid={true}>
        <Row className='bulk-op-item'>
          <Col span={24} style={{ padding: 0 }}>
            {
              site() == 'intl' ? (<BatchMethod getData={this.model.getBatchMethodData}
                domains={this.model.data.querydomains} />) :
                (<BatchMethodCN getData={this.model.getBatchMethodData}
                  domains={this.model.data.querydomains}
                />)
            }
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col className='batch-lenged' span={6}>
            <label>{i18n('batch-op-set-privacy')} : </label>
          </Col>
          <Col span={18}>
            <RadioGroup
              data-bind="data.valuePrivacyProtect"
              items={this.model.data.itmesPrivacyProtect}
            >
            </RadioGroup>
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col span={24} style={{ padding: 0 }}>
            {
              site() == 'intl' ? (<IdentifyEmail onChange={this.model.vCodeChange}
                url='/whoisProtectionApi/SendAuthCode.json' />) :
                (<IdentifyTel onChange={this.model.vCodeChange}
                  url='/whoisProtectionApi/SendAuthCode.json' />)
            }
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col span={6}>
          </Col>
          <Col span={18}>
            <label><CheckBox onChange={this.model.serviceTermsChange}
              id='batch-op-read-accept' />{i18n('batch-op-read-accept')}</label>&nbsp;

            {
              /*eslint-disable*/
              site() == 'intl' ? <a target="_blank"
                href={i18n('batch-op-domain-name-privacy-policy-address')} >
                &nbsp;{i18n('bath-op-dns-privacy-protection-service-terms')}</a> :
                <a href=
                  'http://terms.aliyun.com/legal-agreement/terms/suit_bu1_ali_cloud/suit_bu1_ali_cloud201703061733_85034.html'
                  target="_blank" >
                  《域名隐私保护服务条款》</a>
              /*eslint-enable*/
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
              <span>{this.model.data.submited_tipMessage}</span>
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
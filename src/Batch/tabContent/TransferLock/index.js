import React, { Component } from 'react';
import NoTransferLockModel from '../../models/TransferLock';
import { Grid, RadioGroup, Button, Dialog } from '@ali/aps';
import { model, binding, watch } from 'mota';
import { i18n } from 'common';
import { site } from 'domain-sdk-common/utils';
import './index.less';
import BatchMethod from '../../components/batchMethod';
import BatchMethodCN from '../../components/batchMethodCN';
import IdentifyEmail from '../../components/identifyEmail';
import IdentifyTel from '../../components/identifyTel';

const Row = Grid.Row;
const Col = Grid.Col;

@model(NoTransferLockModel)
@binding

export default class NoTransferLock extends Component {
  componentDidMount() {
    this.model.getOnceToken();
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
      <Grid cellPadding={10} fluid={true} className='batch-table'>
        <Row className='bulk-op-item'>
          <Col span={24} style={{ padding: 0 }}>
            {
              site() == 'intl' ? (<BatchMethod getData={this.model.getBatchMethodData}
              />) :
                (<BatchMethodCN getData={this.model.getBatchMethodData} />)
            }
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col md={6} className='batch-lenged'>
            <label htmlFor="">{i18n('setstate')} : </label>
          </Col>
          <Col md={18} className="changeWidth">
            <RadioGroup
              data-bind="data.defaultState"
              items={this.model.data.stateGroup}>
            </RadioGroup>
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col span={24} style={{ padding: 0 }}>
            {
              site() == 'intl' ? (<IdentifyEmail onChange={this.model.vCodeChange}
                url='/transferLockApi/SendAuthCode.json' />) :
                (<IdentifyTel onChange={this.model.vCodeChange}
                  url='/transferLockApi/SendAuthCode.json' />)
            }
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col span={6}>
          </Col>
          <Col span={18}>
            <Button disabled={this.model.data.submitDisabled}
              onClick={this.model.submit}>{i18n('email-submit')}</Button>
            <Dialog visible={this.model.data.visible}
              title={i18n('tip')}
              buttons={[{ text: i18n('cancel') }, { text: i18n('confirm'), type: 'primary' }]}
              style={{ width: 500 }}
              onOverlayClick={this.model.close}
              onButtonClick={this.model.onBtnClick}
              onClose={this.model.close}>
              <span>{this.model.data.tipMessage}</span>
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
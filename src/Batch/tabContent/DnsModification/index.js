import React, { Component } from 'react';
import { RadioGroup, Grid, Input, Button, Dialog } from '@ali/aps';
import { model, binding, watch } from 'mota';
import querystring from 'querystring';
import Model from '../../models/DnsModification';
import { i18n } from 'common';
import { site } from 'domain-sdk-common/utils';

import BatchMethod from '../../components/batchMethod';
import BatchMethodCN from '../../components/batchMethodCN';

const Row = Grid.Row;
const Col = Grid.Col;

@model(Model)
@binding
export default class DnsModification extends Component {

  componentDidMount() {
    this.model.getOnceToken();
  }

  componentWillMount() {
    const { location } = this.props;
    if (location && location.search) {
      const query = querystring.parse(location.search.slice(1));
      this.model.data.querydomains = (query.domains || '').split(',')
        .join('\r\n');
    }
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
              site() == 'cn' ?
                (<BatchMethodCN getData={this.model.getBatchMethodData}
                  domains={this.model.data.querydomains}
                />) :
                (<BatchMethod getData={this.model.getBatchMethodData}
                  domains={this.model.data.querydomains} />)
            }
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col className='batch-lenged' span={6}>
            <label>{i18n('batch-op-set-dns')} : </label>
          </Col>
          <Col span={18}>
            <RadioGroup
              data-bind="data.valueSetDns"
              items={this.model.data.itmesSetDns}
              onChange={this.model.onchange}
            >
            </RadioGroup>
          </Col>
        </Row>
        <Row className='bulk-op-item' style={this.model.data.valueSetDns == `${i18n('batch-op-custom-dns')}` ?
          { display: 'block' } : { display: 'none' }}>
          <Col className='batch-lenged' span={6}></Col>
          <Col span={18}>
            <div className='tipmessage'
              style={this.model.data.tipIsShow == true ?
                { display: 'block', color: 'red' } : { display: 'none' }}>
              {i18n('batch-op-input-double-dns')}
            </div>
            <label>DNS1: <Input size="small" data-bind={'data.dnses[0].dns'}
              onBlur={this.model.onBlur} /></label><br />
            <label>DNS2: <Input size="small" data-bind={'data.dnses[1].dns'}
              onBlur={this.model.onBlur} /></label><br />
            <label>DNS3: <Input size="small" data-bind={'data.dnses[2].dns'}
              onBlur={this.model.onBlur} /></label><br />
            <label>DNS4: <Input size="small" data-bind={'data.dnses[3].dns'}
              onBlur={this.model.onBlur} /></label><br />
            <label>DNS5: <Input size="small" data-bind={'data.dnses[4].dns'}
              onBlur={this.model.onBlur} /></label><br />
            <label>DNS6: <Input size="small" data-bind={'data.dnses[5].dns'}
              onBlur={this.model.onBlur} /></label><br />
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col className='batch-lenged' span={6}></Col>
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

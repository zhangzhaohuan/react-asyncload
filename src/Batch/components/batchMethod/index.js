import React, { Component } from 'react';
import { RadioGroup, Grid, Input, Upload, notification } from '@ali/aps';
import { model, binding } from 'mota';
import Model from './model';
import { i18n } from 'common';
import './index.less';
const Row = Grid.Row;
const Col = Grid.Col;

@model(Model)
@binding
export default class BatchMethod extends Component {

  componentDidMount() {
    this.model.init();
    this.model.data.domainList = this.props.domains || '';
  }
  componentDidUpdate() {
    //将组件中的数据传递给父组件
    this.props.getData(this.model.data);
  }

  //文件上传
  onDone = ({ xhr }) => {
    let res = JSON.parse(xhr.response);
    if (res.code == 200) {
      this.model.data.fileKey = res.data;
      // this.props.uploadDone(this.model.data.fileKey);
      this.props.getData(this.model.data);
    } else {
      notification.alert(i18n('batch-op-fileupload-failed'));
    }
  }

  render() {

    return <div className="batch-op-in-col">
      <Grid fluid={true}>
        <Row className='bulk-op-item'>
          <Col className='batch-lenged' span={6}>
            <label htmlFor="">{i18n('batch-method')} : </label>
          </Col>
          <Col span={18}>
            <RadioGroup
              data-bind="data.valueBatchMethod"
              items={this.model.itemsBatchMethod}>
            </RadioGroup>
          </Col>
        </Row>
        {
          (this.model.data.valueBatchMethod == i18n('custom-domain')) ?
            (<Row className='bulk-op-item'>
              <Col className='batch-lenged' span={6}>
                <label htmlFor="">{i18n('domain-list')} : </label>
              </Col>
              <Col span={18}>
                <Input multiple rows={10} data-bind='data.domainList' style={{ width: '280px' }} />
                <p>{i18n('batch-op-enter-domain')}
                  {` ${this.model.domainNumber} `}
                  {i18n('batch-op-can-also-input')}{` ${this.model.leaveDomainNumber} `}{i18n('batch-op-a-domain')}</p>
              </Col>
            </Row>) :
            (<Row className='bulk-op-item'>
              <Col className='batch-lenged' span={6}>
                <label htmlFor="">{i18n('select-file')} : </label></Col>
              <Col span={18}>
                <Upload url={'/BatchOperationApi/upload.json'}
                  name="fileToUpload"
                  text={i18n('batch-op-select-files')}
                  onDone={this.onDone} />
                <p>{i18n('batch-op-upload-file-tip')}</p>
              </Col>
            </Row>)
        }
        {/* <Row className='bulk-op-item' style={this.model.data.valueBatchMethod == `${i18n('custom-domain')}` ?
          { display: 'block' } : { display: 'none' }}>
          <Col className='batch-lenged' span={6}>
            <label htmlFor="">{i18n('domain-list')} : </label>
          </Col>
          <Col span={18}>
            <Input multiple rows={10} data-bind='data.domainList' style={{ width: '280px' }} />
            <p>{i18n('batch-op-enter-domain')}
              {` ${this.model.domainNumber} `}
              {i18n('batch-op-can-also-input')}{` ${this.model.leaveDomainNumber} `}{i18n('batch-op-a-domain')}</p>
          </Col>
        </Row>
        <Row className='bulk-op-item' style={this.model.data.valueBatchMethod == `${i18n('upload-file')}` ?
          { display: 'block' } : { display: 'none' }}>
          <Col className='batch-lenged' span={6}>
            <label htmlFor="">{i18n('select-file')} : </label></Col>
          <Col span={18}>
            <Upload url={'/BatchOperationApi/upload.json'}
              name="fileToUpload"
              text={i18n('batch-op-select-files')}
              onDone={this.onDone} />
            <p>{i18n('batch-op-upload-file-tip')}</p>
          </Col>
        </Row> */}
      </Grid>
    </div >;
  }
}
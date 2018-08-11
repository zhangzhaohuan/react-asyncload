import React, { Component } from 'react';
import { RadioGroup, Grid, Input, Upload, Select, notification } from '@ali/aps';
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
    this.model.query();
    // console.log(this.props.domains);
    this.model.data.domainList = this.props.domains || '';
  }
  componentDidUpdate() {
    // console.log(this.model.data.domainGroup);
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

  //renderSelectItem
  renderSelectItem = () => {
    if (this.model.data.valueBatchMethod == i18n('custom-domain')) {
      return (
        <Row className='bulk-op-item'>
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
      );
    } else if (this.model.data.valueBatchMethod == i18n('domain-group')) {
      return (
        <Row className='bulk-op-item'>
          <Col className='batch-lenged' span={6}>
            <label htmlFor="">{i18n('domain-group')} : </label>
          </Col>
          <Col span={18}>
            <Select
              dataSource={this.model.dataSource}
              data-bind="data.domainGroup"
              defaultValue={i18n('batch-op-please-select')}
            >
            </Select>
            <a href='//domain.console.aliyun.com/index.htm#/domainGroupMgr/domainGroupList'>
            {i18n('batch-op-view-domain-group')}</a>
          </Col>
        </Row>
      );
    } else {
      return (
        <Row className='bulk-op-item'>
          <Col className='batch-lenged' span={6}>
            <label htmlFor="">{i18n('select-file')} : </label></Col>
          <Col span={18}>
            <Upload url={'/BatchOperationApi/upload.json'}
              name="fileToUpload"
              text={i18n('batch-op-select-files')}
              onDone={this.onDone} />
            <p>{i18n('batch-op-upload-file-tip')}</p>
          </Col>
        </Row>
      );
    }
  }

  render() {
    return <div className="batch-op-in-col batch-op-cn">
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
        <Row className='bulk-op-item' style={this.model.data.valueBatchMethod == `${i18n('domain-group')}` ?
          { display: 'block' } : { display: 'none' }}>
          <Col className='batch-lenged' span={6}>
            <label htmlFor="">{i18n('domain-group')} : </label>
          </Col>
          <Col span={18}>
            <Select
              dataSource={this.model.dataSource}
              data-bind="data.domainGroup"
              defaultValue={i18n('batch-op-please-select')}
            >
            </Select>
            <a href='/domainGroupMgr/domainGroupList'>{i18n('batch-op-view-domain-group')}</a>
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
        {
          this.renderSelectItem()
        }
      </Grid>
    </div >;
  }
}
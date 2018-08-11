import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'common';
import { Alert, DatePicker, Button, Table, Grid } from '@ali/aps';
import { model, binding } from 'mota';
import Model from './model';
import './index.less';
import sdk from 'domain-sdk';
const { Site } = sdk.components;

const { Column, Empty } = Table;
const { Row, Col } = Grid;

@model(Model)
@binding
export default class LogList extends Component {
  state = {
    startValue: null,
    endValue: null,
    milliSeconds: 90 * 24 * 60 * 60 * 1000,  //90天转化为毫秒
    nowDay: new Date()
  };

  componentDidMount() {
    this.model.init();
    this.model.query();
  }

  renderTaskNum = ({ value, row }) => {
    if (value == 0 && row.taskStatus == 'WAITING_EXECUTE') {
      return;
    } else {
      return value;
    }
  }


  //渲染详情 
  renderOpDetail = ({ value }) => {
    return <Link to={`/batch/log/historyDetail?taskNo=${value}`}>{i18n('batch-op-view-details')}</Link>;
  }

  //渲染操作结果
  renderOpResult = ({ value }) => {
    switch (value) {
      case 'WAITING_EXECUTE':
        return i18n('batch-op-log-waiting');
      case 'EXECUTING':
        return i18n('batch-op-log-in-execution');
      case 'COMPLETE':
        return i18n('batch-op-log-execute-completed');
      default:
        return '';
    }
  }


  render() {
    return (
      <div className='batch-loglist'>
        <Grid cellPadding={10} fluid={true}>
          <Row>
            <Col span={24}>
              <Alert type="warning">
                <span>{i18n('batch-op-log-out-tip')}</span>
                <Link to='/batch/log/List'> {i18n('batch-op-click-here')}</Link>
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <span>{`${i18n('batch-op-log-opera-time')} : `}</span>
              <DatePicker
                value={this.model.state.startValue}
                onChange={this.model.onStartChange}
              />
              <span> - </span>
              <DatePicker
                value={this.model.state.endValue}
                onChange={this.model.onEndChange}
              />
              <Button size="small" type="primary" onClick={this.model.search}>{i18n('search')}</Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table data={this.model.data} >
                {/* <Column field="taskType" align="left"
                  head={i18n('op-log-table-head-operation')}
                  cell={this.renderOpAction}
                /> */}
                <Column field="taskTypeDescription" align="left"
                  head={i18n('op-log-table-head-operation')}
                />
                <Column field="taskNum" head={i18n('batch-op-domain-number')} align="left"
                  cell={this.renderTaskNum}
                />
                <Column field="taskStatus" head={i18n('op-log-table-head-result')}
                  cell={this.renderOpResult} align="left" />
                <Column field="createTime"
                  head={<span>{i18n('batch-op-log-time')}<Site site="intl">(UTC)</Site></span>}
                  align="left" />
                <Column field="clientip" head={i18n('batch-op-log-operator-ip')} align="left" />
                <Column field="taskNo" head={i18n('operate')} cell={this.renderOpDetail} align="left" />
                <Empty>{i18n('batch-op-log-no-operation-record')}</Empty>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="pre-next" style={this.model.isEmpty ? { display: 'none' } : { display: 'block' }}>
                <Button className="btn" size="small" type="primary"
                  disabled={this.model.disablePre}
                  onClick={this.model.prePage}
                > {i18n('batch-op-log-pre')}</Button >
                <Button className="btn" size="small" type="primary"
                  onClick={this.model.nextPage}
                  disabled={this.model.disableNext} > {i18n('batch-op-log-next')}</Button >
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

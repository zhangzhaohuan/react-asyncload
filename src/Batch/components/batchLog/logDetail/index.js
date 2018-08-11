import React, { Component } from 'react';
import { Table, Grid, Pagination, Select } from '@ali/aps';
import { i18n } from 'common';
import querystring from 'querystring';
import { model, binding } from 'mota';
import Model from './model';
import './index.less';

import sdk from 'domain-sdk';

const { Site } = sdk.components;
const { Column, Empty } = Table;
const { Row, Col } = Grid;

@model(Model)
@binding
export default class LogDetail extends Component {
  componentDidMount() {
    this.model.init();
    const { location } = this.props;
    if (location && location.search) {
      const query = querystring.parse(location.search.slice(1));
      this.model.params.taskNo = query.taskNo;
    }
    this.model.query();
  }

  //渲染操作状态
  renderOpStatus = ({ value, row }) => {
    console.log(row);
    switch (value) {
      case 'WAITING_EXECUTE':
        return i18n('batch-op-log-waiting');
      case 'EXECUTING':
        return i18n('batch-op-log-in-execution');
      case 'EXECUTE_SUCCESS':
        return i18n('batch-op-log-execute-success');
      case 'EXECUTE_FAILURE':
        return <div>
          <p style={{ color: 'red', textAlign: 'left' }}>{i18n('batch-op-log-execute-failure')}{
            row.tryCount < 5 ? <span style={{ color: 'red' }}>{`,${i18n('batch-op-log-auto-try')}`}</span> : ''
          }</p>
          <p style={{ color: 'red' }}>{`(${i18n('transfer-in-detail-reason')}：${row.errorMsg})`}</p>
        </div>;
      case 'AUDITING':
        return i18n('batch-op-log-auditing');
      default:
        return '';
    }
  }

  render() {
    return (
      <div className='batch-logdetail'>
        <Grid cellPadding={10} fluid={true}>
          <Row>
            <Col span={24}>
              <span>{i18n('batch-op-registrant-status')} : </span>
              <Select
                dataSource={this.model.dataSource}
                defaultValue={this.model.defaultValue}
                onChange={this.model.onStateChange}
              >
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table data={this.model.data} >
                <Column field="taskTypeDescription" align="left"
                  head={i18n('batch-op-log-opera-type')}
                />
                <Column field="domainName" head={i18n('op-log-table-head-domain')} align="left" />
                <Column field="updateTime"
                  head={<span>{i18n('batch-op-log-opera-time')}<Site site="intl">(UTC)</Site></span>} align="left" />
                <Column field="taskStatus" head={i18n('transfer-in-list-operation')}
                  cell={this.renderOpStatus} align="left" />
                <Empty>{i18n('batch-op-log-no-operation-record')}</Empty>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="log-pagination" style={{ textAlign: 'right' }}>
                <Pagination
                  defaultCurrent={1}
                  total={this.model.total}
                  pageSize={this.model.params.pageSize}
                  showTotal
                  onChange={this.model.switchPage}
                  pageSizeOptions={['20', '50', '100', '200']}
                  onPageSizeChange={this.model.setPageSize}
                  current={this.model.params.currentPage} />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

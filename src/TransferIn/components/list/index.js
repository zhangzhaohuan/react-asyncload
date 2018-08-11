import React, { Component } from 'react';
import { TopBar } from 'components';
import { i18n } from 'common';
import { Link } from 'react-router-dom';
// import configs from '$config';
import { Button, Input, DatePicker, Table, Grid, Pagination, Select } from '@ali/aps';
import { model, binding } from 'mota';
import Model from './model';
import './index.less';
// import { site } from 'domain-sdk-common/utils';
import sdk from 'domain-sdk';

const { Site } = sdk.components;

const { Row, Col } = Grid;
const { Column, Empty } = Table;
// const { transferdetail} = configs.services;

@model(Model)
@binding
export default class List extends Component {
  componentDidMount() {
    this.model.query();
  }

  go = () => {
    const url = i18n('transfer-in-goto-transfer');
    window.open(url, '_blank');
  }

  goCn = () => {
    const url = '//wanwang.aliyun.com/domain/transfers';
    window.open(url, '_blank');
  }

  renderStatus = ({ value }) => {
    switch (value) {
      case 'FAIL':
        return <span style={{ color: '#F00' }}>{i18n('transfer-in-status-failure')}</span>;
      case 'SUCCESS':
        return <span style={{ color: '#090' }}>{i18n('transfer-in-status-success')}</span>;
      case 'PENDING':
        return i18n('transfer-in-status-pending');
      case 'PASSWORD_VERIFICATION':
        return i18n('transfer-in-status-password-verification');
      case 'NAME_VERIFICATION':
        return i18n('transfer-in-status-named-audit');
      case 'AUTHORIZATION':
        return i18n('transfer-in-status-authorization');
      case 'INIT':
        return i18n('transfer-in-status-submit');
      default:
        return '';
    }
  }

  renderOperation = ({ value }) => {
    // const url = `${transferdetail}${value}`;
    return (
      // <a href={url}>{i18n('transfer-in-details')}</a>
      <Link to={`/transfer-in/detail/${value}`}>{i18n('transfer-in-details')}</Link>
    );
  }
  render() {
    return (
      <div className='transfer-in-list'>
        <TopBar title={i18n('transfer-in-management')}>
          <Site site="intl">
            <Button className="aps-pull-right" size="small"
              type="primary" onClick={this.go}>
              {i18n('transfer-in-list-want-transfer')}
            </Button>
          </Site>
          <Site site="cn">
            <Button className="aps-pull-right" size="small"
              type="primary" onClick={this.goCn}>
              {i18n('transfer-in-list-want-transfer')}
            </Button>
          </Site>
          <Site site="cn">
            <span>
              <span style={{ color: '#f68300' }}>{i18n('transfer-in-history-records')}</span>
              <a href='//netcn.console.aliyun.com/core/domain/getinlist'>
                {i18n('transfer-in-please-click')}</a>
            </span>
          </Site>

        </TopBar>
        <Grid cellPadding={10} fluid={true}>
          <Row>
            <Col span={24}>
              <span className='label-list'>{`${i18n('transfer-in-list-keywords')} ：`}</span>
              <Input placehol={i18n('transfer-in-list-label-retrieval')}
                data-bind='params.domainName' />
              <span className='label-list'>{`${i18n('transfer-in-list-status')} : `}</span>
              <Select
                dataSource={this.model.dataSource}
                data-bind='selectedstatus'
                onChange={this.model.onStatusChange}>
              </Select>
              <span className='label-list'>{`${i18n('transfer-in-list-label-submit-time')} ：`}</span>
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
                <Column field="domainname" align="left"
                  head={i18n('transfer-in-domain-name')} />
                <Column field="simpleTransferInStatus" head={i18n('transfer-in-list-status')} align="left"
                  cell={this.renderStatus}
                />
                {/* <span>{i18n('transfer-in-time-submit-password')}<Site site="intl">(UTC)</Site></span> */}
                <Column field="gmtCreate"
                  head={<span>{i18n('transfer-in-submit-time')}<Site site="intl">(UTC)</Site></span>}
                  cell={this.renderOpResult} align="left" />
                <Column field="transferCodeSubmitTime"
                  head={<span>{i18n('transfer-in-time-submit-password')}<Site site="intl">(UTC)</Site></span>}
                  align="left" />
                <Column field="saleid" head={i18n('transfer-in-list-operation')} align="left"
                  cell={this.renderOperation}
                />
                <Empty>{i18n('batch-op-log-no-operation-record')}</Empty>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="log-pagination"
                style={this.model.state.showPagination ? { display: 'block' } : { display: 'none' }}
              >
                <Pagination
                  defaultCurrent={1}
                  total={this.model.total}
                  pageSize={this.model.params.pageSize}
                  showTotal
                  onChange={this.model.switchPage}
                  pageSizeOptions={['10', '20', '50', '100']}
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

import React, { Component } from 'react';
import { Table, Grid, Select, Button } from '@ali/aps';
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
export default class LogHistoryDetail extends Component {
  componentDidMount() {
    this.model.init();
    const { location } = this.props;
    if (location && location.search) {
      const query = querystring.parse(location.search.slice(1));
      this.model.params.taskNo = query.taskNo;
    }
    this.model.query();
  }

  //渲染操作行为列表
  // renderOpAction = ({ value }) => {
  //   switch (value) {
  //     case 'MERGE_ORDER_ACTIVATE':
  //       return i18n('batch-op-log-purchase');    //域名注册
  //     case 'ORDER_ACTIVATE':
  //       return i18n('batch-op-log-purchase');    //域名注册
  //     case 'MERGE_ORDER_RENEW':
  //       return i18n('batch-op-domain-name-reneval');  //域名续费
  //     case 'ORDER_RENEW':
  //       return i18n('batch-op-domain-name-reneval');  //域名续费
  //     case 'MERGE_ORDER_REDEEM':
  //       return i18n('MERGE_ORDER_REDEEM');        //域名赎回
  //     case 'ORDER_REDEEM':
  //       return i18n('MERGE_ORDER_REDEEM');        //域名赎回
  //     case 'MERGE_ORDER_TRANSFER':
  //       return i18n('batch-op-domain-transfer');   //域名转入
  //     case 'ORDER_TRANSFER':
  //       return i18n('batch-op-domain-transfer');   //域名转入
  //     case 'CHG_DNS':
  //       return i18n('batch-op-log-dns');   //DNS修改
  //     // case 'ORDER_ACTIVATE':
  //     //   return i18n('batch-op-log-create');   //创建注册订单：   、、、、、、、、、、、、、、、、未翻译英文
  //     case 'CHG_HOLDER':
  //       return i18n('batch-op-log-info');   //域名持有者信息修改
  //     case 'UPDATE_ADMIN_CONTACT':
  //       return i18n('batch-op-log-admin');  //管理者信息修改
  //     case 'UPDATE_BILLING_CONTACT':
  //       return i18n('batch-op-log-billing');   //付费者信息修改
  //     case 'UPDATE_TECH_CONTACT':
  //       return i18n('batch-op-log-tech');   //技术者信息修改
  //     case 'SET_WHOIS_PROTECT':
  //       return i18n('dns-privacy-protection-service');  //域名隐私保护服务 
  //     case 'SET_TRANSFER_PROHIBITED':
  //       return i18n('batch -op-log-prohibition-lock');    //设置禁止转移锁
  //     default:
  //       return '';
  //   }
  // }

  //渲染操作状态
  renderOpStatus = ({ value, row }) => {
    if (value == 'WAITING_EXECUTE') {
      return (
        <div>
          <span>{i18n('batch-op-log-waiting')}</span>
        </div>
      );
    } else if (value == 'EXECUTING') {
      return (
        <div>
          <span>{i18n('batch-op-log-in-execution')}</span>
          <p>123</p>
        </div>
      );
    } else if (value == 'EXECUTE_SUCCESS') {
      return (
        <div>
          <span>{i18n('batch-op-log-execute-success')}</span>
        </div>
      );
    } else if (value == 'EXECUTE_FAILURE') {
      return (
        <div>
          <p style={{ color: 'red' }}>{i18n('batch-op-log-execute-failure')}{
            row.tryCount < 5 ? <span style={{ color: 'red' }}>{`,${i18n('batch-op-log-auto-try')}`}</span> : ''
          }</p>

          <p style={{ color: 'red' }}>{`(${i18n('transfer-in-detail-reason')}：${row.errorMsg})`}</p>


        </div>
      );
    } else {
      return (
        <div>
          <span>{i18n('batch-op-log-auditing')}</span>
        </div>
      );
    }
    // switch (value) {
    //   case 'WAITING_EXECUTE':
    //     return i18n('batch-op-log-waiting');
    //   case 'EXECUTING':
    //     return i18n('batch-op-log-in-execution');
    //   case 'EXECUTE_SUCCESS':
    //     return i18n('batch-op-log-execute-success');
    //   case 'EXECUTE_FAILURE':
    //     return i18n('batch-op-log-execute-failure');
    //   case 'AUDITING':
    //     return i18n('batch-op-log-auditing');
    //   default:
    //     return '';
    // }
  };

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
                {/* <Column field="taskType" align="left"
                  head={i18n('op-log-table-head-operation')}
                  cell={this.renderOpAction}
                /> */}
                <Column field="taskTypeDescription" align="left"
                  head={i18n('op-log-table-head-operation')}
                />
                <Column field="domainName" head={i18n('op-log-table-head-domain')} align="left" />


                <Column field="updateTime" head=
                  {<span>{i18n('op-log-table-head-result')}<Site site="intl">(UTC)</Site></span>} align="left" />
                <Column field="taskStatus" head={i18n('batch-op-registrant-status')}
                  cell={this.renderOpStatus} align="left" />
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
                > 上一页</Button >
                <Button className="btn" size="small" type="primary"
                  onClick={this.model.nextPage}
                  disabled={this.model.disableNext} > 下一页</Button >
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

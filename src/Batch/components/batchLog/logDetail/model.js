import * as sdk from 'common/sdk';
import { i18n } from 'common';

export default class LogDetail {
  params = {
    taskNo: '',
    pageSize: 50,
    currentPage: 1,
    taskStatus: 0
  }
  dataSource = [i18n('batch-op-log-all-state'), i18n('batch-op-log-waiting'),
    i18n('batch-op-log-not-executed'), i18n('batch-op-log-execute-success'),
    i18n('batch-op-log-execute-failure')];
  defaultValue = i18n('batch-op-log-all-state');
  total = 0;
  data = [];
  // errorMsg = '';

  query = async () => {
    const params = this.params;
    const result = await sdk.services.management.bulkOpt.queryTaskDetailList(params);
    this.data = result.data.data;
    this.total = result.data.totalItemNum;
    // this.errorMsg = result.data.errorMsg;
  }

  switchPage = (pageIndex, pageSize) => {
    this.params.currentPage = pageIndex;
    this.params.pageSize = pageSize;
    this.query(); //查询模板
  }

  setPageSize = (pageIndex, pageSize) => {
    this.params.currentPage = pageIndex;
    this.params.pageSize = pageSize;
    this.query();
  };

  //切换状态
  onStateChange = (e) => {
    const { value } = e;
    switch (value) {
      case i18n('batch-op-log-all-state'):
        this.params.taskStatus = '';
        break;
      case i18n('batch-op-log-waiting'):
        this.params.taskStatus = 0;
        break;
      case i18n('batch-op-log-not-executed'):
        this.params.taskStatus = 1;
        break;
      case i18n('batch-op-log-execute-success'):
        this.params.taskStatus = 2;
        break;
      case i18n('batch-op-log-execute-failure'):
        this.params.taskStatus = 3;
        break;
      default:
        '';
    }
    this.defaultValue = value;
    this.query();
  }

  //初始化参数
  init = () => {
    this.params = {
      taskNo: '',
      pageSize: 50,
      currentPage: 1,
      taskStatus: ''
    };
  };



}
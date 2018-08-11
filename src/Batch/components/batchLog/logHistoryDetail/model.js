import * as sdk from 'common/sdk';
import { i18n } from 'common';

export default class LogHistoryDetailModel {
  results = {};
  params = {
    taskNo: '',
    pageSize: 50,
    taskStatus: ''
  }
  dataSource = [i18n('batch-op-log-all-state'), i18n('batch-op-log-waiting'),
    i18n('batch-op-log-not-executed'), i18n('batch-op-log-execute-success'),
    i18n('batch-op-log-execute-failure')];
  defaultValue = i18n('batch-op-log-all-state');
  data = [];
  isEmpty = true;  //数据是否为空
  disablePre = true;
  disableNext = true;

  query = async () => {
    const params = this.params;
    console.log(params);
    
    const result = await sdk.services.management.bulkOpt.queryTaskDetailHistory(params);
    this.results = result.data;
    this.data = result.data.objects || [];
    this.data.length == 0 ? this.isEmpty == true : this.isEmpty = false;
    JSON.stringify(this.results.prePageCursor) == '{}' ? this.disablePre = true : this.disablePre = false;
    JSON.stringify(this.results.nextPageCursor) == '{}' ? this.disableNext = true : this.disableNext = false;
  }

  // switchPage = (pageIndex, pageSize) => {
  //   this.params.currentPage = pageIndex;
  //   this.params.pageSize = pageSize;
  //   this.query(); //查询模板
  // }

  // setPageSize = (pageIndex, pageSize) => {
  //   this.params.currentPage = pageIndex;
  //   this.params.pageSize = pageSize;
  //   this.query();
  // };

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
    if(this.params.domainNameCursor){
      this.params.domainNameCursor = '';
    }
    if(this.params.taskDetailNoCursor){
      this.params.taskDetailNoCursor = '';
    }
    this.query();
  }

  //初始化参数
  init = () => {
    this.params = {
      taskNo: '',
      pageSize: 50,
      taskStatus: ''
    };
  };

  //查询上一页
  prePage = () => {
    const obj = {
      domainNameCursor: this.results.prePageCursor.domainName,
      taskDetailNoCursor: this.results.prePageCursor.taskDetailNo
    };
    Object.assign(this.params, obj);
    this.query();
  }

  //查询下一页
  nextPage = () => {
    console.log('in');
    const obj = {
      domainNameCursor: this.results.nextPageCursor.domainName,
      taskDetailNoCursor: this.results.nextPageCursor.taskDetailNo
    };
    Object.assign(this.params, obj);
    this.query();    
  }
}
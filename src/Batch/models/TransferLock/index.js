import { i18n } from 'common';
import * as sdk from 'common/sdk';

export default class NoTransferLockModel {
  data = {
    domainList: '',  //域名列表 
    defaultState: i18n('batch-op-open-no-transfer-lock'),   //默认状态
    stateGroup: [i18n('batch-op-open-no-transfer-lock'), i18n('batch-op-close-no-transfer-lock')], //状态切换
    emailAdd: '',  //邮箱地址
    timerCount: 0, //倒计时
    submitDisabled: true,
    tipMessage: '验证错误',
    visible: false,
    successVisible: false,   //提交成功提示
    taskParam: { 'transferProhibited': true }
  };
  //请求参数
  params = {
    dataContent: '',
    dataSource: 1,
    onceToken: '',
    taskParam: '{ \'transferProhibited\': true }', //禁止转移锁业务参数
    taskType: '12', //禁止转移锁任务类型
    vCode: ''
  }

  /*获取token*/
  getOnceToken = async () => {
    const result = await sdk.services.management.bulkOpt.getOnceToken();
    this.params.onceToken = result.data;
  }

  /*获取请求参数*/
  getParams = () => {
    //确定业务参数
    this.data.defaultState == i18n('batch-op-open-no-transfer-lock') ? this.data.taskParam.transferProhibited = true :
      this.data.taskParam.transferProhibited = false;
    let taskParam = this.data.taskParam;
    typeof (taskParam) == 'string' ? '' : this.params.taskParam = JSON.stringify(taskParam);
    return this.params;
  }

  //dataSource=1,则数据内容为域名列表
  getCustomData = () => {
    let arr = this.data.domainList.split('\n');
    let newarr = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] != '' && arr[i].trim() != '') {
        let item = arr[i].trim();
        newarr.push(item);
      }
    }
    this.params.dataContent = newarr.join();
  }

  //判断提交
  identificateSubmit = () => {
    if (this.data.serviceTerms == false) {
      this.data.submitDisabled = true;
      return;
    } else if (this.params.dataContent == '') {
      this.data.submitDisabled = true;
      return;
    } else if (this.params.vCode == '') {
      this.data.submitDisabled = true;
      return;
    } else if (this.params.onceToken == '') {
      this.data.submitDisabled = true;
      return;
    } else {
      this.data.submitDisabled = false;
    }
  }

  submit = async () => {
    const params = this.getParams();
    console.log(params);
    const rs = await sdk.services.management.bulkOpt.saveTask(params);
    this.data.submited_tipMessage = rs.message;
    rs.code == '200' ? this.data.successVisible = true : this.data.visible = true;
  }

  close = () => {
    this.data.visible = false;
  }
  onBtnClick = () => {
    this.close();
  }

  successTipClose = () => {
    this.data.successVisible = false;
  }

  onSuccessTipBtnClick = () => {
    this.successTipClose();
    location.href = '//dc.console.aliyun.com/next/index#/batch/log/list';
  }

  /*获取批量方式组件的数据*/
  getBatchMethodData = (data) => {
    const { valueBatchMethod, domainList, domainGroup, fileKey } = data;
    this.data.domainList = domainList;
    if (valueBatchMethod == i18n('custom-domain')) {
      this.params.dataSource = 1;
      this.getCustomData();
    } else if (valueBatchMethod == i18n('domain-group')) {
      this.params.dataSource = 2;
      this.params.dataContent = domainGroup;
    } else {
      this.params.dataSource = 3;
      this.params.dataContent = fileKey;
    }
  }

  //验证码改变
  vCodeChange = (vCode) => {
    this.params.vCode = vCode;
  }
}

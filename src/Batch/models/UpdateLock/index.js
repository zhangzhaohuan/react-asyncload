import { i18n } from 'common';
import * as sdk from 'common/sdk';

export default class NoUpdateLockModel {
  data = {
    domainList: '',
    upFile: '',
    visible: false,
    successVisible: false,   //提交成功提示
    submitDisabled: true,
    tipMessage: '验证错误',
    emailAdd: '',  //邮箱地址
    defaultState: i18n('batch-op-open-no-update-lock'),
    stateGroup: [i18n('batch-op-open-no-update-lock'), i18n('batch-op-close-no-update-lock')],
    timerCount: 0,//倒计时
    taskParam: { 'updateProhibited': true }
  };

  //请求参数
  params = {
    dataContent: '',
    dataSource: 1,
    onceToken: '',
    taskParam: '{ \'updateProhibited\': true }', //禁止更新锁参数
    taskType: '11',
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
    this.data.defaultState == i18n('batch-op-open-no-update-lock') ? this.data.taskParam.updateProhibited = true :
      this.data.taskParam.updateProhibited = false;
    let taskParam = this.data.taskParam;
    typeof (taskParam) == 'string' ? '' : this.params.taskParam = JSON.stringify(taskParam);
    return this.params;
  }

  //dataSource=1,获得datacontent
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
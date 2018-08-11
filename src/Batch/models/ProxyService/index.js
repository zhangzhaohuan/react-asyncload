import * as sdk from 'common/sdk';
import { i18n } from 'common';

export default class PrivacyProtectionModel {

  data = {
    valueBatchMethod: i18n('custom-domain'),
    domainList: '',
    domainGroup: '',
    fileKey: '',
    valuePrivacyProtect: i18n('batch-op-open-privacy-protection'),
    itmesPrivacyProtect: [
      i18n('batch-op-open-privacy-protection'),
      i18n('batch-op-close-privacy-protection')],
    visible: false,
    successVisible: false,   //提交成功提示
    serviceTerms: false,//服务条款
    submitDisabled: true,
    submited_tipMessage: '',
    taskParam: { 'whoisProtect': true },
    querydomains: ''
  };

  //请求参数
  params = {
    dataContent: '',
    dataSource: 1,
    onceToken: '',
    taskParam: '{whoisProtect: true}',
    taskType: '3',
    vCode: ''
  };

  /*获取token*/
  getOnceToken = async () => {
    const result = await sdk.services.management.bulkOpt.getOnceToken();
    this.params.onceToken = result.data;
  }

  //提交
  submit = async () => {
    const params = this.getParams();
    // console.log(params);
    const rs = await sdk.services.management.bulkOpt.saveTask(params);
    this.data.submited_tipMessage = rs.message;
    rs.code == '200' ? this.data.successVisible = true : this.data.visible = true;
  }

  /*获取请求参数*/
  getParams = () => {
    //确定业务参数
    this.data.valuePrivacyProtect == i18n('batch-op-open-privacy-protection') ?
      this.data.taskParam.whoisProtect = true :
      this.data.taskParam.whoisProtect = false;
    let taskParam = this.data.taskParam;
    this.params.taskParam = JSON.stringify(taskParam);
    return this.params;
  }

  //domainlist格式转化
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

  //服务条款
  serviceTermsChange = (event) => {
    this.data.serviceTerms = event.target.checked;
    this.identificateSubmit();
  }

  //提交按钮能否点击
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
    this.data.valueBatchMethod = data.valueBatchMethod;
    this.data.domainList = data.domainList;
    this.data.domainGroup = data.domainGroup;
    this.data.fileKey = data.fileKey;
    //判断数据来源、确定数据内容
    if (this.data.valueBatchMethod == i18n('custom-domain')) {
      this.params.dataSource = 1;
      this.getCustomData();
    } else if (this.data.valueBatchMethod == i18n('domain-group')) {
      this.params.dataSource = 2;
      this.params.dataContent = this.data.domainGroup;
    } else {
      this.params.dataSource = 3;
      this.params.dataContent = this.data.fileKey;
    }
    // this.identificateSubmit();
  }

  //验证码改变
  vCodeChange = (vCode) => {
    this.params.vCode = vCode;
  }
} 

import * as sdk from 'common/sdk';
import { i18n } from 'common';

export default class PrivacyProtectionModel {

  data = {
    valueBatchMethod: i18n('custom-domain'),
    itemsBatchMethod: [i18n('custom-domain'), i18n('upload-file')],
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
    taskParam: '',
    taskType: '3',
    vCode: ''
  };

  /*获取token*/
  getOnceToken = async () => {
    const result = await sdk.services.management.bulkOpt.getOnceToken();
    this.params.onceToken = result.data;
  }

  // 文件上传完成
  uploadDone = (fileKey) => {
    this.data.fileKey = fileKey;
    this.identificateSubmit();
  }

  submit = async () => {
    const params = this.getParams();
    // console.log(params);
    const rs = await sdk.services.management.bulkOpt.saveTask(params);
    this.data.submited_tipMessage = rs.message;
    rs.code == '200' ? this.data.successVisible = true : this.data.visible = true;
  }


  /*获取请求参数*/
  getParams = () => {
    //判断数据来源
    if (this.data.valueBatchMethod == i18n('custom-domain')) {
      this.params.dataSource = 1;
    } else if (this.data.valueBatchMethod == i18n('domain-group')) {
      this.params.dataSource = 2;
    } else {
      this.params.dataSource = 3;
    }
    //确定数据内容
    if (this.params.dataSource == 1) {
      this.getCustomData();
    } else if (this.params.dataSource == 2) {
      this.params.dataContent = '分组id';
    } else {
      this.params.dataContent = this.data.fileKey;
    }
    //判断任务类型
    //确定业务参数。。
    this.data.valuePrivacyProtect == i18n('batch-op-open-privacy-protection') ?
      this.data.taskParam.whoisProtect = true :
      this.data.taskParam.whoisProtect = false;
    let taskParam = this.data.taskParam;
    this.params.taskParam = JSON.stringify(taskParam);
    //手机验证码
    return this.params;
  }

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

  serviceTermsChange = (event) => {
    this.data.serviceTerms = event.target.checked;
    this.identificateSubmit();
  }

  identificateSubmit = () => {
    if (this.data.serviceTerms == false) {
      this.data.submitDisabled = true;
      return;
    }
    if (this.data.valueBatchMethod == i18n('custom-domain')) {
      this.data.domainList != '' && this.params.vCode != '' ?
        this.data.submitDisabled = false : this.data.submitDisabled = true;
    } else if (this.data.valueBatchMethod == i18n('upload-file')) {
      (this.params.vCode != '' && this.data.fileKey != '') ?
        this.data.submitDisabled = false : this.data.submitDisabled = true;
    } else {
      (this.params.vCode != '' && this.data.domainGroup != '' &&
        this.data.domainGroup != i18n('batch-op-please-select')) ?
        this.data.submitDisabled = false : this.data.submitDisabled = true;
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
    location.href = '/#/domain/batchLogList';
  }


  isSelected(item) {
    const selected = this.model.data.templateIdlist;
    return selected.indexOf(item.value) > -1;
  }

  toggleSelect(item) {
    const selected = this.model.data.templateIdlist;
    if (this.isSelected(item)) {
      const index = selected.indexOf(item.value);
      selected.splice(index, 1);
    } else {
      selected.push(item.value);
    }
    this.setState({ selected });
  }

  renderEmailVerificationStatus = item => {
    if (item == 1) {
      return (
        <span>Verification Successful</span>
      );
    } else {
      return (
        <a href="/next/index#/email-verify?email=kk@163.com">Verify Now</a>
      );
    }
  }

  /*获取批量方式组件的数据*/
  getBatchMethodData = (data) => {
    // console.log(data);
    this.data.valueBatchMethod = data.valueBatchMethod;
    this.data.domainList = data.domainList;
    this.data.fileKey = data.fileKey;
    this.identificateSubmit();
  }

  //验证码改变
  vCodeChange = (vCode) => {
    // console.log(vCode);
    this.params.vCode = vCode;
    this.identificateSubmit();
  }
} 

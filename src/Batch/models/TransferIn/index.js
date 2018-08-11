import { i18n } from 'common';
import * as sdk from 'common/sdk';
import { notification } from '@ali/aps';

export default class BatchIntoModel {
  data = {
    defaultRenewalaTerm: '1',
    valueBatchMethod: i18n('custom-domain'),
    itemsBatchMethod: [i18n('custom-domain'), i18n('upload-file')],
    domainList: '',
    upFile: '',
    fileKey: '',
    emailAdd: '',  //邮箱地址
    timerCount: 0,//倒计时
    updateDominInfoValue: '',
    domainProtect: true,
    contactTemplateIdlist: [],
    taskParam: {
      contactTemplateId: ''
    },
    privacyProtectionTerms: false,  //隐私保护服务条款
    serviceterms: false,  //服务条款
    submitDisabled: true,
    successVisible: false,//显示提交成功提示
    contactTemplates: []
  };
  //请求参数
  params = {
    dataContent: '',
    dataSource: 7,
    onceToken: '',
    taskParam: '',
    taskType: '24',
    vCode: ''
  }

  /*获取token*/
  getOnceToken = async () => {
    const result = await sdk.services.management.bulkOpt.getOnceToken();
    this.params.onceToken = result.data;
  }

  /*获取请求参数*/
  getParams = () => {
    //判断数据来源 
    this.data.valueBatchMethod == i18n('custom-domain') ? this.params.dataSource = 7 : this.params.dataSource = 8;
    //确定数据内容
    this.params.dataSource == 7 ? this.determineDataContent() : this.params.dataContent = this.data.fileKey;
    //判断任务类型
    //确定业务参数。。
    this.confirmTaskParam();
    //邮箱验证码
    this.params.vCode = this.params.vCode;

    return this.params;
  }

  //确定数据内容
  determineDataContent = () => {
    let arr = this.data.domainList.split('\n');
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] != '') {
        let farr = arr[i].trim().split(' ');
        newArr.push({ 'domainName': farr[0], 'transferPwd': farr[farr.length - 1] });
      }
    }
    this.params.dataContent = JSON.stringify(newArr);
  }

  get have() {
    return this.data.domainList.split('\n').some(str => str.trim().split(' ').length < 2);
  }

  onSelect = item => {
    this.data.taskParam.contactTemplateId = item.registrantProfileId;
    this.judgmentToSubmit();
  }

  //确认业务参数
  confirmTaskParam = () => {
    let taskParam = JSON.stringify(this.data.taskParam);
    this.params.taskParam = taskParam;
  }

  /*文件上传*/
  onDone = ({ xhr }) => {
    let res = JSON.parse(xhr.response);
    if (res.code == 200) {
      this.data.fileKey = res.data;
      this.judgmentToSubmit();
    } else {
      notification.alert(i18n('batch-op-fileupload-failed'));
    }
  }

  serviceTermsChange = (event) => { //服务条款
    this.data.serviceterms = event.target.checked;
    this.judgmentToSubmit();
  }

  /*文件上传*/
  uploadFile = async (params) => {
    const rs = await sdk.services.management.bulkOpt.uploadFile(params);
    this.data.fileKey = rs.data;
    return this.data.fileKey;
  }

  //域名个数
  get domainNumber() {
    let str = this.data.domainList;
    let arr = str.split('\n');
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] != '' && arr[i].trim() != '') {
        count++;
      }
    }
    return count;
  }

  // 剩余可输入域名个数
  get leaveDomainNumber() {
    return 1000 - this.domainNumber;
  }

  submit = async () => {
    const params = this.getParams();
    console.log(params);

    const rs = await sdk.services.management.bulkOpt.saveTask(params);
    this.data.error_tipMessage = rs.message;
    rs.code == '200' ? this.data.successVisible = true : this.data.visible = true;
  }

  //获取邮箱
  async getUserEmail() {
    const result = await sdk.services.management.bulkOpt.getUserEmail();
    this.data.emailAdd = result.data;
  }

  //获取验证码
  // getCode = async () => {
  //   if (this.data.timerCount > 0) {
  //     return;
  //   }
  //   this.getUserEmailCode();
  //   await sdk.services.management.bulkOpt.sendBatchIntoCode();
  // }

  // getUserEmailCode = () => {
  //   this.data.timerCount = 60;
  //   this.timer = setInterval(() => {
  //     this.data.timerCount--;
  //     if (this.data.timerCount < 1) {
  //       clearInterval(this.timer);
  //     }
  //   }, 1000);
  // }

  //判断提交
  judgmentToSubmit = () => {
    if (this.data.valueBatchMethod == i18n('custom-domain')) {
      (this.data.domainList != '' && this.params.vCode != '' && this.data.taskParam.contactTemplateId != ''
        && this.data.serviceterms == true && this.have == false) ?
        this.data.submitDisabled = false : this.data.submitDisabled = true;
    } else if (this.data.valueBatchMethod == i18n('upload-file')) {
      (this.data.fileKey != '' && this.params.vCode != '' && this.data.taskParam.contactTemplateId != ''
        && this.data.serviceterms == true) ?
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
    location.href = '//dc.console.aliyun.com/next/index#/batch/log/list';
  }

  //验证码改变
  vCodeChange = (vCode) => {
    console.log(0);
    
    this.params.vCode = vCode;
    this.judgmentToSubmit();
  }
}
import { i18n } from 'common';
import * as sdk from 'common/sdk';
import { notification } from '@ali/aps';

export default class BulkRegisterModel {
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
    taskParam: {
      periodNum: 1,  //年限 
      contactTemplateId: '', //模板id
      domainProtect: false, //是否开启域名隐私保护
      permitPremiumActivation: false //是否注册白金词
    },
    privacyProtectionTerms: false,  //隐私保护服务条款
    serviceterms: false,  //服务条款
    submitDisabled: true,
    successVisible: false //显示提交成功提示
  };
  //请求参数
  params = {
    dataContent: '',
    dataSource: 7,
    onceToken: '',
    taskParam: '',
    taskType: '18',
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
    this.data.valueBatchMethod == i18n('custom-domain') ? this.params.dataSource = 7 : this.params.dataSource = 3;
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
      if (arr[i] != '' && arr[i].trim() != '') {
        newArr.push({ 'domainName': arr[i] });
      }
    }
    this.params.dataContent = JSON.stringify(newArr);
  }

  onSelect = item => {
    this.data.taskParam.contactTemplateId = item.registrantProfileId;
    this.judgmentToSubmit();
  }

  // 确认业务参数
  confirmTaskParam = () => {
    this.data.taskParam.periodNum = this.data.defaultRenewalaTerm;  //确认年限周期
    let domainProtect = (this.data.domainProtect);  //确认是否域名保护
    this.data.taskParam.domainProtect = domainProtect;  //确认是否域名保护
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
  // async getUserEmail() {
  //   const result = await sdk.services.management.bulkOpt.getUserEmail();
  //   this.data.emailAdd = result.data;
  // }

  // //获取验证码
  // getCode = async () => {
  //   if (this.data.timerCount > 0) {
  //     return;
  //   }
  //   this.getUserEmailCode();
  //   await sdk.services.management.bulkOpt.sendBulkRegisterCode();
  // }

  getUserEmailCode = () => {
    this.data.timerCount = 60;
    this.timer = setInterval(() => {
      this.data.timerCount--;
      if (this.data.timerCount < 1) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  //隐私保护服务条款
  privacyProtectionTermsChange = (event) => {
    this.data.privacyProtectionTerms = event.target.checked;
    this.judgmentToSubmit();
  }

  //确认是否域名保护
  domainProtectChange = (event) => {
    this.data.domainProtect = event.target.checked;
  }

  serviceTermsChange = (event) => { //服务条款
    this.data.serviceterms = event.target.checked;
    this.judgmentToSubmit();
  }

  //判断提交 
  judgmentToSubmit = () => {
    if (this.data.valueBatchMethod == i18n('custom-domain')) {
      this.data.domainList != '' && this.params.vCode != '' && this.data.taskParam.contactTemplateId != ''
        && (this.data.privacyProtectionTerms == false && this.data.domainProtect == false
          && this.data.serviceterms == true ||
          this.data.privacyProtectionTerms == true && this.data.domainProtect == true &&
          this.data.serviceterms == true) ?
        this.data.submitDisabled = false : this.data.submitDisabled = true;
    } else if (this.data.valueBatchMethod == i18n('upload-file')) {
      this.data.fileKey != '' && this.params.vCode != '' &&
        this.data.taskParam.contactTemplateId != ''
        && (this.data.privacyProtectionTerms == false && this.data.domainProtect == false
          && this.data.serviceterms == true ||
          this.data.privacyProtectionTerms == true && this.data.domainProtect == true &&
          this.data.serviceterms == true) ?
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
    this.params.vCode = vCode;
    this.judgmentToSubmit();
  }
}
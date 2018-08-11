import * as sdk from 'common/sdk';
import { i18n } from 'common';
import { site } from 'domain-sdk-common/utils';

export default class InfoModifyModel {
  data = {
    valueBatchMethod: i18n('custom-domain'),  //批量方式
    domainList: '',
    domainGroup: '',
    fileKey: '',
    updateDominInfoValue: '',       //修改域名信息
    updateDominInfoItems: [
      i18n('domain-holder-information'),
      i18n('manager-information'),
      i18n('payee-information'),
      i18n('technology-person-information')
    ],
    valueVerificationMode: i18n('phone-authentication'),  //验证方式: 手机认证、app认证
    itemsVerificationMode: [i18n('phone-authentication'), i18n('app-authentication')],
    visible: false,                 //显示错误提示
    successVisible: false,          //显示提交成功提示
    // i18n('batch-op-select-all'),
    submitDisabled: true,
    transferProhibited: true,
    serviceTerms: false,            //服务条款
    taskParam: {
      templateId: '',
      transferProhibited: 'false'
    },
    error_tipMessage: '',    //错误提示信息
    verifyEmailURL: '/next/index#/email-verify?email=kk@163.com',
    querydomains: ''
  };

  //提交请求参数
  params = {};
  //请求模板参数
  templateParams = {
    currentPage: 1,
    pageSize: 10
  }

  //初始化
  init = () => {
    this.params = {
      dataContent: '',
      dataSource: 1,
      onceToken: '',
      taskParam: '',
      taskType: '3',
      vCode: '',
      ivToken: ''
    };
  }

  /*获取token*/
  getOnceToken = async () => {
    const result = await sdk.services.management.bulkOpt.getOnceToken();
    this.params.onceToken = result.data;
  }

  submit = async () => {
    const params = this.getParams();
    if (site() == 'intl') {

      delete params.ivToken;
    } else if (this.data.valueVerificationMode == i18n('phone-authentication')) {
      delete params.ivToken;
    } else {
      delete params.vCode;
    }
    console.log(params);
    const rs = await sdk.services.management.bulkOpt.saveTask(params);
    this.data.error_tipMessage = rs.message;
    rs.code == '200' ? this.data.successVisible = true : this.data.visible = true;
  }

  /*获取请求参数*/
  getParams = () => {
    //判断任务类型
    this.judgeTaskType();
    //确定业务参数
    this.confirmTaskParam();
    //手机验证码
    return this.params;
  }

  /*判断任务类型*/
  judgeTaskType = () => {
    if (this.data.updateDominInfoValue == '') {
      this.params.taskType = '';
    } else {
      let arr = this.data.updateDominInfoValue;
      let newarr = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == i18n('domain-holder-information')) {
          newarr.push('1');
        } else if (arr[i] == i18n('manager-information')) {
          newarr.push('8');
        } else if (arr[i] == i18n('payee-information')) {
          newarr.push('9');
        } else {
          newarr.push('10');
        }
      }
      this.params.taskType = newarr.join();
    }
    return this.params.taskType;
  }

  confirmTaskParam = () => {
    let transferProhibited = (!this.data.transferProhibited).toString();
    this.data.taskParam.transferProhibited = transferProhibited;
    let taskParam = JSON.stringify(this.data.taskParam);
    this.params.taskParam = taskParam;
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

  transferProhibitedChange = (event) => {
    this.data.transferProhibited = event.target.checked;
  }

  serviceTermsChange = (event) => {
    this.data.serviceTerms = event.target.checked;
    this.identificateSubmit();
  }

  //判断submit按钮是否能点击
  identificateSubmit = () => {
    if (this.data.serviceTerms == false) {
      this.data.submitDisabled = true;
      return;
    } else if (this.data.updateDominInfoValue == '') {
      this.data.submitDisabled = true;
      return;
    } else if (this.data.taskParam.templateId == '') {
      this.data.submitDisabled = true;
      return;
    } else if (this.params.dataContent == '') {
      this.data.submitDisabled = true;
      return;
    } else if (site() == 'intl' && this.params.vCode == '') {
      this.data.submitDisabled = true;
      return;
    } else if (site() == 'cn' && this.data.valueVerificationMode == i18n('phone-authentication') &&
      this.params.vCode == '') {
      this.data.submitDisabled = true;
      return;
    } else if (site() == 'cn' && this.data.valueVerificationMode == i18n('app-authentication') &&
      this.params.ivToken == '') {
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
    //dc.console.aliyun.com/next/index#/batch/log/list
    location.href = '//dc.console.aliyun.com/next/index#/batch/log/list';
  }

  //信息模板radio切换
  onSelect = item => {
    this.data.taskParam.templateId = item.registrantProfileId;
    // console.log(this.data.taskParam.templateId);
    this.identificateSubmit();
  }

  checkBoxChange = () => {
    let items = this.data.updateDominInfoItems;
    this.data.updateDominInfoValue == items ? this.data.updateDominInfoValue = '' :
      this.data.updateDominInfoValue = items;
  }

  get allSelectStatus() {
    return (this.data.updateDominInfoValue.length == 4);
  }

  /*获取批量方式组件的数据*/
  getBatchMethodData = (data) => {
    // console.log(data);
    this.data.valueBatchMethod = data.valueBatchMethod;
    this.data.domainList = data.domainList;
    this.data.fileKey = data.fileKey;
    this.data.domainGroup = data.domainGroup;
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
    this.identificateSubmit();
  }

  //验证码改变
  vCodeChange = (vCode) => {
    this.params.vCode = vCode;
    this.identificateSubmit();
  }

  //获取到app认证的ivToken
  ivTokenChange = (ivToken) => {
    this.params.ivToken = ivToken;
    this.identificateSubmit();
  }

  //raidogroup change
  ChangeRadioGroup = (event) => {
    console.log(event);
  }
}
import * as sdk from 'common/sdk';
import { i18n } from 'common';

export default class DnsModificationModel {
  data = {
    valueBatchMethod: i18n('custom-domain'),
    domainList: '',
    domainGroup: '',
    fileKey: '',
    valueSetDns: i18n('batch-op-nets-dns'),
    itmesSetDns: [i18n('batch-op-nets-dns'), i18n('batch-op-custom-dns')],
    tipIsShow: true,
    dnses: [
      { dns: '' }, { dns: '' }, { dns: '' }, { dns: '' }, { dns: '' }, { dns: '' }
    ],
    visible: false,
    successVisible: false,   //提交成功提示
    submitDisabled: true,
    submited_tipMessage: '',
    querydomains: ''
  };
  //请求参数
  params = {
    dataContent: '',
    dataSource: 1,
    onceToken: '',
    taskParam: '',
    taskType: '2',
    vCode: ''
  }

  /*获取token*/
  getOnceToken = async () => {
    const result = await sdk.services.management.bulkOpt.getOnceToken();
    this.params.onceToken = result.data;
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
    //确定业务参数
    this.data.valueSetDns == i18n('batch-op-nets-dns') ? this.netsTaskParam() : this.customTaskParam();
    return this.params;
  }

  //域名列表格式转化
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

  //自定义_params
  customTaskParam = () => {
    let dnses = [];
    for (let i = 0; i < this.data.dnses.length - 1; i++) {
      if (this.data.dnses[i].dns != '') {
        dnses.push(this.data.dnses[i]);
      }
    }
    let custom_taskParam = {
      'isHiChina': false,
      'dnses': dnses
    };
    this.params.taskParam = JSON.stringify(custom_taskParam);
  }

  //万网_params
  netsTaskParam = () => {
    let net_taskParams = {
      'isHiChina': true
    };
    this.params.taskParam = JSON.stringify(net_taskParams);
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


  //鉴定阿里云dns
  identifyNetDns = () => {
    if (this.params.dataContent == '') {
      this.data.submitDisabled = true;
      return;
    } else if (this.params.onceToken == '') {
      this.data.submitDisabled = true;
      return;
    } else {
      this.data.submitDisabled = false;
    }
  }

  //鉴定自定义dns
  identifyEnterDns = () => {
    if (this.params.dataContent == '') {
      this.data.submitDisabled = true;
      return;
    } else if (this.params.onceToken == '') {
      this.data.submitDisabled = true;
      return;
    } else if (this.data.tipIsShow == true) {
      this.data.submitDisabled = true;
      return;
    } else {
      this.data.submitDisabled = false;
    }
  }

  //提交按钮能否点击
  identificateSubmit = () => {
    if (this.data.valueSetDns == i18n('batch-op-nets-dns')) {
      this.identifyNetDns();
    } else {
      this.identifyEnterDns();
    }
  }

  /*提交完成dialog*/
  close = () => {
    this.data.visible = false;
  }

  onBtnClick = () => {
    this.close();
  }

  onBlur = () => {
    let arr = this.data.dnses;
    let newarr = [];
    for (let i = 0; i < arr.length - 1; i++) {
      let dns = arr[i].dns;
      if (dns != '') {
        newarr.push(dns);
      }
      if (newarr.length >= 2) {
        break;
      }
    }
    if (newarr.length >= 2) {
      this.data.tipIsShow = false;
    }
    if (newarr.length < 2) {
      this.data.tipIsShow = true;
    }
  }

  /*获取批量方式组件的数据*/
  getBatchMethodData = (data) => {
    // console.log(data);
    this.data.valueBatchMethod = data.valueBatchMethod;
    this.data.domainList = data.domainList;
    this.data.fileKey = data.fileKey;
    this.data.domainGroup = data.domainGroup;
    // 判断数据来源、确定数据内容
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
  }
}
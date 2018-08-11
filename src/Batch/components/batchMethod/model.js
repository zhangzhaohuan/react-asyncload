// import * as sdk from 'common/sdk';
import { i18n } from 'common';
// import { notification } from '@ali/aps';

export default class BatchMethod {
  data = {
    valueBatchMethod: i18n('custom-domain'),
    domainList: '',
    domainGroup:'',
    fileKey: ''
  }
  itemsBatchMethod= [i18n('custom-domain'), i18n('upload-file')];

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

  /*切换tab时，重置batchMethods组件*/
  init = ()=>{
    this.data.valueBatchMethod = i18n('custom-domain');
    this.data.domainList = '';
    this.data.fileKey = '';
  }
}
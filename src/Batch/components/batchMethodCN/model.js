import * as sdk from 'common/sdk';
import { i18n } from 'common';

export default class BatchMethod {
  data = {
    valueBatchMethod: i18n('custom-domain'),
    domainList: '',
    fileKey: '',
    domainGroup:''
  }
  itemsBatchMethod = [i18n('custom-domain'),i18n('domain-group'), i18n('upload-file')];
  dataSource = [];   //i18n('batch-op-please-select')
  // selected = '';

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
    this.data.domainGroup= '',
    this.data.fileKey = '';
  }

  /*获取域名分组*/
  query = async () => {
    const result = await sdk.services.management.bulkOpt.queryDomainGroup();
    const data = result.data.data;
    for (let i = 0; i <data.length; i++) {
      this.dataSource.push({
        value: data[i].domainGroupId,
        label: data[i].domainGroupName
      });
    }
  }

}
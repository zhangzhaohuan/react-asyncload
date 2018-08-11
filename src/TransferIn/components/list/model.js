import { i18n } from 'common';
import * as sdk from 'common/sdk';

export default class TransferList {
  dataSource = [
    {
      value: 'ALL',
      label: i18n('all-email')
    },
    {
      value: 'INIT',
      label: i18n('transfer-in-status-submit')
    },
    {
      value: 'AUTHORIZATION',
      label: i18n('transfer-in-status-authorization')
    },
    {
      value: 'NAME_VERIFICATION',
      label: i18n('transfer-in-status-named-audit')
    },
    {
      value: 'PASSWORD_VERIFICATION',
      label: i18n('transfer-in-status-password-verification')
    },
    {
      value: 'PENDING',
      label: i18n('transfer-in-status-pending')
    },
    {
      value: 'SUCCESS',
      label: i18n('transfer-in-status-success')
    },
    {
      value: 'FAIL',
      label: i18n('transfer-in-status-failure')
    }
  ];
  data = [];
  total = 0;
  state = {
    startValue: '',
    endValue: '',
    showPagination: true
  }
  selectedstatus = 'ALL';
  params = {
    currentPage: 1,
    domainName: '',
    endDate: '',
    orderByType: '',
    pageSize: 10,
    startDate: ''
  };

  switchPage = (pageIndex, pageSize) => {
    this.params.currentPage = pageIndex;
    this.params.pageSize = pageSize;
    this.query();
  }

  setPageSize = (pageIndex, pageSize) => {
    this.params.currentPage = pageIndex;
    this.params.pageSize = pageSize;
    this.query();
  };

  onStatusChange = () => {
    let statusfilter = this.selectedstatus;
    if (statusfilter == 'ALL') {
      delete this.params.transferInStatus;
    } else {
      Object.assign(this.params, { transferInStatus: statusfilter });
    }
    console.log(this.params);
  }
  search = () => {
    this.query();
  }

  query = async () => {
    const params = this.params;
    // console.log(params);
    const result = await sdk.services.management.transferIn.queryTransferInList(params);
    this.data = result.data.data;
    this.data.length == 0 ? this.state.showPagination = false : this.state.showPagination = true;
    this.total = result.data.totalItemNum;
  }

  //开始日期改变
  onStartChange = (e) => {
    const { value } = e;
    this.state.startValue = value;
    this.params.startDate = new Date(value).getTime();
  }
  //结束日期改变
  onEndChange = (e) => {
    const { value } = e;
    this.state.endValue = value;
    this.params.endDate = new Date(value).getTime();
  }
}

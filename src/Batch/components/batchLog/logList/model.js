import * as sdk from 'common/sdk';

export default class LogList {
  data = [];
  total = 0;
  params = {
    pageSize: 50,
    // beginCreateTime: '',
    currentPage: 1
    // endCreateTime: ''
  };

  state = {
    startValue: null,
    endValue: null,
    milliSeconds: 90 * 24 * 60 * 60 * 1000,  //90天转化为毫秒
    nowDay: new Date(),
    showPagination: true
  };

  onStartChange = (e) => {
    this.identifyStartDate(e);
  }

  onEndChange = (e) => {
    this.identifyEndDate(e);
  }

  //日期判断90天内
  identifyStartDate = (e) => {
    const { endValue, milliSeconds, nowDay } = this.state;
    const { value } = e.value;  //str
    const minTime = new Date(nowDay.getTime() - milliSeconds);
    const obj = {
      beginCreateTime: ''
    };
    if (value >= minTime && value <= nowDay) {
      if (value <= endValue || endValue == null) {
        obj.beginCreateTime = value.getTime();
        Object.assign(this.params, obj);
        this.state.startValue = value;
      } else {
        obj.beginCreateTime = endValue.getTime();
        Object.assign(this.params, obj);
        this.state.startValue = endValue;
      }
    } else {
      endValue != null ? obj.beginCreateTime = endValue.getTime() :
        obj.beginCreateTime = nowDay.getTime();
      Object.assign(this.params, obj);
      endValue != null ? this.state.startValue = endValue :
        this.state.startValue = nowDay;
    }
  }

  identifyEndDate = (e) => {
    const { value } = e.value;  //str
    const { startValue, milliSeconds, nowDay } = this.state;
    const minTime = new Date(nowDay.getTime() - milliSeconds);
    const obj = {
      endCreateTime: ''
    };
    if (value >= minTime && value <= nowDay) {
      if (value >= startValue || startValue == null) {
        obj.endCreateTime = value.getTime();
        Object.assign(this.params, obj);
        this.state.endValue = value;
      } else {
        obj.endCreateTime = startValue.getTime();
        Object.assign(this.params, obj);
        this.state.endValue = startValue;
      }
    } else {
      startValue != null ? obj.beginCreateTime = startValue.getTime() :
        obj.beginCreateTime = nowDay.getTime();
      Object.assign(this.params, obj);
      startValue != null ? this.state.endValue = startValue :
        this.state.endValue = nowDay;
    }
  }
  //90天内
  query = async () => {
    const params = this.params;
    const result = await sdk.services.management.bulkOpt.queryTaskInfoList(params);
    this.data = result.data.data;
    this.data.length == 0 ? this.state.showPagination = false : this.state.showPagination = true;
    this.total = result.data.totalItemNum;
  }

  switchPage = (pageIndex, pageSize) => {
    this.params.currentPage = pageIndex;
    this.params.pageSize = pageSize;
    this.query(); //查询模板
  }

  setPageSize = (pageIndex, pageSize) => {
    this.params.currentPage = pageIndex;
    this.params.pageSize = pageSize;
    this.query();
  };

  //初始化参数
  init = () => {
    this.params = {
      pageSize: 50,
      currentPage: 1
    };
  };

  //搜索
  search = () => {
    this.query();
  }
}

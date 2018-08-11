import * as sdk from 'common/sdk';

export default class LogList {
  results = {};
  data = [];
  isEmpty = true;
  disablePre = true;
  disableNext = true;
  //90天外 参数
  params = {
    pageSize: 50
  }

  state = {
    startValue: null,
    endValue: null,
    milliSeconds: 90 * 24 * 60 * 60 * 1000,  //90天转化为毫秒
    nowDay: new Date()
  };

  onStartChange = (e) => {
    this.identifyStartDateOut(e);
  }

  onEndChange = (e) => {
    this.identifyEndDateOut(e);
  }

  //日期判断
  identifyStartDateOut = (e) => {
    const { endValue, milliSeconds, nowDay } = this.state;
    const { value } = e.value;  //str
    const minTime = new Date(nowDay.getTime() - milliSeconds);
    const obj = {
      beginCreateTime: ''
    };
    if (value <= minTime) {
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
      obj.beginCreateTime = minTime.getTime();
      Object.assign(this.params, obj);
      this.state.startValue = minTime;
    }
  }

  identifyEndDateOut = (e) => {
    const { value } = e.value;  //str
    const { startValue, milliSeconds, nowDay } = this.state;
    const minTime = new Date(nowDay.getTime() - milliSeconds);
    const obj = {
      endCreateTime: ''
    };
    if (value <= minTime) {
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
      obj.endCreateTime = minTime.getTime();
      Object.assign(this.params, obj);
      this.state.endValue = minTime;
    }
  }

  query = async () => {
    const params = this.params;
    // console.log(params);
    const result = await sdk.services.management.bulkOpt.queryTaskInfoHistory(params);
    this.results = result.data;
    this.data = result.data.objects || [];
    this.data.length == 0 ? this.isEmpty == true : this.isEmpty = false;
    // console.log(JSON.stringify(this.results.prePageCursor)=="{}");
    JSON.stringify(this.results.prePageCursor) == '{}' ? this.disablePre = true : this.disablePre = false;
    JSON.stringify(this.results.nextPageCursor) == '{}' ? this.disableNext = true : this.disableNext = false;
  }

  //初始化参数
  init = () => {
    this.params = {
      pageSize: 50
    };
  };

  //搜索
  search = () => {
    if(this.params.createTimeCursor){
      this.params.createTimeCursor = '';
    }
    if(this.params.taskNoCursor){
      this.params.taskNoCursor = '';
    }
    this.query();
  }

  //查询上一页
  prePage = () => {
    const obj = {
      createTimeCursor: this.results.prePageCursor.createTimeLong,
      taskNoCursor: this.results.prePageCursor.taskNo
    };
    Object.assign(this.params, obj);
    this.query();
  }

  //查询下一页
  nextPage = () => {
    const obj = {
      createTimeCursor: this.results.nextPageCursor.createTimeLong,
      taskNoCursor: this.results.nextPageCursor.taskNo
    };
    Object.assign(this.params, obj);
    this.query();
  }
}

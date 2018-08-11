import * as sdk from 'common/sdk';
// import { i18n } from 'common';

export default class IdentifyApp {

  appAuthUrl = '';  //手机认证的url

  ivToken = '';
  params = {
    havanaCallBack:''
  }
  //初始化
  init = () => {
  }

  //手机app认证url
  query = async () => {
    const havanaCallBack = window.location.href;
    this.params.havanaCallBack = havanaCallBack;
    const params = this.params;
    const result = await sdk.services.management.bulkOpt.getAppAuthUrl(params);
    
    this.appAuthUrl = result.data.result; 
    console.log(this.appAuthUrl);
  }
}
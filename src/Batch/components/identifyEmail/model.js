import * as sdk from 'common/sdk';
// import { i18n } from 'common';

export default class IdentifyEmail {
  email = '';
  timerCount = 0;
  vCode = '';
  url='';
  //初始化
  init = ()=>{
    this.timerCount=0;
    this.vCode = '';
  }
  //获取邮箱
  query = async ()=> {
    const result = await sdk.services.management.bulkOpt.queryAccountProfileInfo();
    this.email = result.data;
  }
 
  //获取验证码
  getCode = async () => {
    if (this.timerCount > 0) {
      return;
    }
    this.count();
    await sdk.services.management.bulkOpt.getCode(this.url);
  }

  count = () => {
    this.timerCount = 60;
    this.timer = setInterval(() => {
      this.timerCount--;
      if (this.timerCount < 1) {
        clearInterval(this.timer);
      }
    }, 1000);
  }
}
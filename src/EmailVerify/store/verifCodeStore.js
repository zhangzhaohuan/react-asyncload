import { observable } from 'mobx';
import * as sdk from 'common/sdk';

const DEAD_TIME = 60;
class VerifCodeStore {
  @observable verifCode // 获取到的验证码
  @observable inputVerifCode // 输入的验证码
  @observable showCodeWrong
  @observable showRegetCode
  @observable deadTime
  @observable visible
  @observable telNumber
  constructor() {
    this.verifCode = '';
    this.inputVerifCode = '';
    this.showCodeWrong = false;
    this.showRegetCode = false;
    this.deadTime = DEAD_TIME;
    this.visible = false;
    this.timer = null;
  }
  // 查询用户手机
  async getTelNumber() {
    let result = await sdk.services.management.emailVerify.getTelNumber();
    //console.log(result);
    return result;
  }

  // 获取验证码
  async getCode() {
    let result = await sdk.services.management.emailVerify.getCode();
    //console.log(result);
    return result;
  }
}

export default new VerifCodeStore();

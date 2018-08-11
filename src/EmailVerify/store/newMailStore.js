import { observable } from 'mobx';
import * as sdk from 'common/sdk';

class NewMailStore {
  @observable emailAddress
  @observable isSuccess
  @observable successList
  @observable failList
  @observable existList

  constructor() {
    this.emailAddress = [];
    this.isSuccess = false;
    this.successList = [];
    this.failList = [];
    this.existList = [];
  }

  // 提交邮箱验证
  async verifyNewMail() {
    const param = {
      email: this.emailAddress.join(','),
      sendIfExist: true
    };
    let result = await sdk.services.management.emailVerify.verifyNewMail(param);
    //console.log(result);
    return result;
  }
}
export default new NewMailStore();
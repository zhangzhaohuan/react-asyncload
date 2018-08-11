import { observable } from 'mobx';
import * as sdk from 'common/sdk';

class ItemStore {
  @observable mailIdArr
  @observable showEmailSend
  @observable showVerifLimit
  @observable showVerifError

  constructor() {
    this.mailIdArr = [];
    this.showEmailSend = false;
    this.showVerifLimit = false;
    this.showVerifError = false;
  }

  // 删除记录
  async deleteItem(singleEmail, verifCode) {
    const param = {
      email: singleEmail || this.mailIdArr.join(','),
      vCode: verifCode || ''
    };
    let result = await sdk.services.management.emailVerify.deleteItem(param);
    return result;
  }

  // 重发邮件
  async reSendEmail(singleEmail) {
    let email = singleEmail || this.mailIdArr.join(',');
    const param = {
      email: email
    };
    //console.log(email)
    let result = await sdk.services.management.emailVerify.reSendEmail(param);
    return result;
  }
}
export default new ItemStore();
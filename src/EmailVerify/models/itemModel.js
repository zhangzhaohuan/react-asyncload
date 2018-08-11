import { action } from 'mobx';
import itemStore from '../store/itemStore';
import listStore from '../store/listStore';
import verifyModel from './verifyModel';
import { notification } from '@ali/aps';


class itemModel {
  // 重发邮件
  reSendEmail = async (singleEmail) => {
    const result = await itemStore.reSendEmail(singleEmail);
    //console.log(result)
    return result || {};
    // if (result.data.failList.length == 0) {
    //   itemStore.showEmailSend = true;
    // }
  }

  // 删除记录
  deleteItem = async (singleEmail, verifCode) => {
    const result = await itemStore.deleteItem(singleEmail, verifCode);
    //console.log(result)

    // 验证次数过多
    if (result.code == '111002') {
      verifyModel.hideCodeDialog();
      notification.alert('验证次数过多，请重新获取验证码。');
      return;
    }

    // 验证码错误
    if (result.code == '141008') {
      itemStore.showVerifError = true;
      return;
    }
    if (result.code == '200') {
      let successList = [];
      let failList = result.data.failList;
      itemStore.inputVerifCode = '';
      itemStore.mailIdArr = [];
      verifyModel.hideCodeDialog();

      result.data.successList.forEach((item) => {
        successList.push(item.email);
      });
      if (successList.length) {
        listStore.resultList = listStore.resultList.filter((item) => {
          return successList.indexOf(item.email) < 0;
        });
      }

      if (failList.legnth) {
        alert(failList.length + '个邮箱删除失败。');
      }
    }
  }

  @action
  addMailId(email) {
    if (itemStore.mailIdArr.indexOf(email) < 0) {
      itemStore.mailIdArr.push(email);
    }
  }

  @action
  removeMailId(email) {
    itemStore.mailIdArr = itemStore.mailIdArr
      .filter((item) => { return item != email; });
  }

  @action
  closeEmailSend() {
    itemStore.showEmailSend = false;
  }
}

export default new itemModel();
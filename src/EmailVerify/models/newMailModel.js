import { action } from 'mobx';
import newMailStore from '../store/newMailStore';
import listModel from './list';

class newMailModel { 
  // 提交邮箱验证
  verifyNewMail = async () => {
    const result = await newMailStore.verifyNewMail();
    if (result.code == 200) {
      newMailStore.isSuccess = true;
      this.setList(result.data);
      listModel.getResultList();
    }
  }

  @action addAddress(email) {
    newMailStore.emailAddress = email;
  }

  @action closeSuccess() {
    newMailStore.isSuccess = false;
  }

  @action
  setList(data) {
    newMailStore.successList = data.successList.length ? data.successList : [];
    newMailStore.failList = data.failList.length ? data.failList : [];
    newMailStore.existList = data.existList.length ? data.existList : [];
  }
}

export default new newMailModel();
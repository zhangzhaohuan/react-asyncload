import { action } from 'mobx';
import listStore from '../store/listStore';
import verifyModel from './verifyModel';
class listModel {
  // 获取查询列表
  getResultList = async () => {
    const result = await listStore.getResultList();
    if (result.code == 200 && result.data.data.length) {
      listStore.emptyList = false;
      this.setData(result);
      verifyModel.getTelNumber();
    } else {
      listStore.emptyList = true;
      this.setData();
    }
  };

  @action setData(result) {
    listStore.resultList = result && result.data.data.length ? result.data.data : [];
    listStore.totalNum = result ? result.data.totalItemNum : 0;
  }
  @action changeEmail(email) {
    listStore.email = email;
  }
  @action changeBeginCreateTime(beginTime) {
    listStore.beginCreateTime = beginTime;
  }
  @action changeEndCreateTime(endTime) {
    listStore.endCreateTime = endTime;
  }
  @action changeCurrentPage(currentPage) {
    listStore.currentPage = currentPage;
  }
  @action changeVerificationStatus(state) {
    listStore.verificationStatus = state;
  }
  @action reset() {
    listStore.beginCreateTime = null;
    listStore.endCreateTime = null;
    listStore.email = null;
    listStore.verificationStatus = ' ';
  }
}

export default new listModel();
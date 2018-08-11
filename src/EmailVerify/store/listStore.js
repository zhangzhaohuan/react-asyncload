import { observable, computed } from 'mobx';
import * as sdk from 'common/sdk';

const PAGE_SIZE = 10;
class ListStore {
  @observable resultList;
  @observable email;
  @observable verificationStatus;
  @observable currentPage;
  @observable verificationStatus;
  @observable beginCreateTime;
  @observable endCreateTime;
  @observable totalNum;
  @observable emptyList;

  constructor() {
    this.verificationStatus = ' ';
    this.currentPage = 1;
    this.resultList = [];
    this.emptyList = true;
  }
  @computed get searchOpts() {
    return {
      currentPage: this.currentPage || 1,
      pageSize: PAGE_SIZE,
      beginCreateTime: this.beginCreateTime || '',
      endCreateTime: this.endCreateTime || '',
      email: this.email || '',
      verificationStatus: this.verificationStatus
    };
  }

  async getResultList() {
    let result = await sdk.services.management.emailVerify.getResultList(this.searchOpts);
    //console.log(result);
    return result;
  }
}

export default new ListStore();
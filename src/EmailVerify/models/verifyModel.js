import { action } from 'mobx';
import verifCodeStore from '../store/verifCodeStore';
import itemStore from '../store/itemStore';
import itemModel from './itemModel';
 
const DEAD_TIME = 60;
class verifyModel {

  // 查询用户手机
  getTelNumber = async() => {
    let result = await verifCodeStore.getTelNumber();
    if (result.code == 200) {
      verifCodeStore.telNumber = result.data;
    }
  }

  // 获取验证码
  getCode = async() => {
    let result = await verifCodeStore.getCode();
    //console.log(result)
    if (result.code == 200) {
      verifCodeStore.verifCode = result.data.requestId;
      verifCodeStore.deadTime = result.data.resendTime;
      verifCodeStore.showRegetCode = true;
      this.verfCodeDeadTime();
    }
  }

  // 提交验证码 & 删除选中的邮箱
  subCode = async(mail) => {
    mail = mail || '';
    //console.log(mail)
    // 从服务端删除该记录
    itemModel.deleteItem(mail, verifCodeStore.inputVerifCode);
  }

  // 可获取验证码倒计时
  @action
  verfCodeDeadTime() {
    verifCodeStore.timer = setInterval(()=>{
      verifCodeStore.deadTime --;
      if (verifCodeStore.deadTime < 0) {
        verifCodeStore.showRegetCode = false;
        verifCodeStore.deadTime = DEAD_TIME;
        clearInterval(verifCodeStore.timer);
      }
    }, 1000);
  }
  @action
  showCodeDialog() {
    verifCodeStore.visible = true;
    verifCodeStore.showCodeWrong = false;
    verifCodeStore.showRegetCode = false;
    verifCodeStore.deadTime = DEAD_TIME;
    clearInterval(verifCodeStore.timer);
  }
  @action
  hideCodeDialog() {
    verifCodeStore.visible = false;
  }
  @action
  setCodeWrong() {
    verifCodeStore.showCodeWrong = true;
    verifCodeStore.visible = true;
  }
  @action
  setInputVerifCode(code) {
    if (!code) {
      itemStore.showVerifError = false;
    }
    verifCodeStore.inputVerifCode = code;
  }

  @action
  hideCodeWrong() {
    verifCodeStore.showCodeWrong = false;
  }
}

export default new verifyModel();
import React, { Component } from 'react';
import { Input, Button, Dialog } from '@ali/aps';
import { observer, inject } from 'mobx-react';
import './verifCode.less';
import i18n from '$i18n';
import verifyModel from '../../models/verifyModel';

@inject('verifCodeStore', 'itemStore')
@observer
class VerifCode extends Component {

  constructor(props) {
    super(props);
    this.verifCodeStore = this.props.verifCodeStore;
  }
  handlerChangeInput(e) {
    verifyModel.hideCodeWrong();
    verifyModel.setInputVerifCode(e.target.value);
  }
  getVerifCode() {
    verifyModel.getCode();
  }
  close() {
    verifyModel.hideCodeDialog();
    verifyModel.setInputVerifCode();
  }

  // 提交验证码 & 删除选中的邮箱
  onBtnClick() {
    verifyModel.subCode(this.props.email);
  }
  render() {
    return (
      <Dialog visible={this.verifCodeStore.visible}
        title={i18n('security-verify')}
        buttons={[{ text: `${i18n('confirm')}`, type: 'primary' }]}
        style={{ width: 400 }}
        onOverlayClick={this.close.bind(this)}
        onButtonClick={this.onBtnClick.bind(this)}
        onClose={this.close.bind(this)}>
        <div>
          <p className="verify-info">
            {i18n('tel-security-verify')}：<span>{this.verifCodeStore.telNumber}</span>
            {
              this.verifCodeStore.showRegetCode
                ? <Button className="btn get-code-btn" size="small" type="normal" disabled>
                  {i18n('reget-verifycode', { sec: this.verifCodeStore.deadTime })}
                </Button>
                : <Button
                  className="btn get-code-btn" size="small" type="normal"
                  onClick={this.getVerifCode.bind(this)}>{i18n('get-verifycode')}</Button>
            }
          </p>
          <div className="verify-info">
            {i18n('sms-verifycode')}：
            <div className="code-input">
              <Input value={this.verifCodeStore.inputVerifCode || ''}
                onChange={this.handlerChangeInput.bind(this)}></Input>
              {this.props.itemStore.showVerifError ?
                <p className="code-wrong">{i18n('verifycode-wrong-alert')}</p> :
                null}
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}
export default VerifCode;
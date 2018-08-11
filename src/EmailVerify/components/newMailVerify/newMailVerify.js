import React, { Component } from 'react';
import { Button, Grid, Dialog, Icon, notification } from '@ali/aps';
import EmailAlert from './emailAlert';
import './newMailVerify.less';
import { observer, inject } from 'mobx-react';
import emailPatern from '../../utils/emailPatern';
import newMailModel from '../../models/newMailModel';
import i18n from '$i18n';
const querystring = require('querystring');

const Row = Grid.Row;
const Col = Grid.Col;

@inject('newMailStore')
@observer
class NewMailVerify extends Component {
  constructor (props) {
    super(props);
    this.emailAddress = [];
    this.state = {
      showFomatAlert: false,
      showLimitAlert: false,
      showAreadyAlert: false,
      emailInputValue: querystring.parse(window.location.hash.split('?')[1]).email
    };
    this.initEmail = querystring.parse(window.location.hash.split('?')[1]).email;
    this.initEmail && this.emailAddress.push(this.initEmail);
    this.newMailStore = this.props.newMailStore;
  }

  handlerAddAddress(e) {
    if (e.keyCode == 13) {
      if (this.emailAddress.length && !emailPatern(this.emailAddress[this.emailAddress.length - 1])) {
        this.setState({
          showFomatAlert: true
        });
      }
    }
  }
  handlerChangeAddress(e) {
    this.emailAddress = e.target.value.trim().split('\n').filter((item)=>{ 
      return item != '';
    });
    this.setState({
      emailInputValue: e.target.value
    });
    if (emailPatern(this.emailAddress)) {
      this.setState({
        showFomatAlert: false
      });
    }
    if (this.emailAddress.length < 100) {
      this.setState({
        showLimitAlert: false
      });
    }
    //console.log(this.emailAddress)
  }

  // 提交验证邮箱
  handlerSubEmailAddress() {
    // 如果邮箱为空
    if (!this.emailAddress.length) {
      notification.alert(i18n('email-no-enter'));
      return;
    }
    // 邮箱条数必须小于100
    if (this.emailAddress.length > 100) {
      this.setState({
        showLimitAlert: true
      });
      return;
    }
    if (!emailPatern(this.emailAddress)) {
      this.setState({
        showFomatAlert: true
      });
    } else {
      newMailModel.addAddress(this.emailAddress);
      newMailModel.verifyNewMail();
    }
  }

  testEmail() {
    return this.emailAddress.every((item) => {
      return emailPatern.test(item);
    });
  }

  close () {
    newMailModel.closeSuccess();
  }
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col span={2} className="verify-new-email">
              <label htmlFor="" className="new-mail-label">{i18n('verify-new-email')}:</label>
            </Col>
            <Col span={16}>
              {/* <textarea 
                className="new-mail-input" 
                placeholder={this.initEmail || i18n('email-input-placeHolder')}
                onKeyUp={this.handlerAddAddress.bind(this)}
                onChange={this.handlerChangeAddress.bind(this)}></textarea> */}
                <textarea 
                className="new-mail-input" 
                placeholder={i18n('email-input-placeHolder')}
                value={this.state.emailInputValue}
                onKeyUp={this.handlerAddAddress.bind(this)}
                onChange={this.handlerChangeAddress.bind(this)}></textarea>
              <div className="sub-btn">
                <p>{i18n('email-add-num-limit-tip')}</p>
                <Button 
                  className="btn" size="medium" type="primary"
                  onClick={this.handlerSubEmailAddress.bind(this)} >{i18n('email-submit')}</Button>
              </div> 
            </Col>
            <Col span={6}>
              <p className={this.state.showFomatAlert ? '' : 'alert-hide'}>
                <Icon type="wrong" className="wrong-icon"/>{i18n('emeil-address-wrong')}
              </p>
              <p className={this.state.showLimitAlert ? '' : 'alert-hide'}>
                <Icon type="wrong" className="wrong-icon"/>{i18n('email-num-limit')}
              </p>
              <p className={this.state.showAreadyAlert ? '' : 'alert-hide'}>
                <Icon type="wrong" className="wrong-icon"/>{i18n('email-passed')}
              </p>
            </Col>
          </Row>
        </Grid>
        <Dialog visible={this.newMailStore.isSuccess}
          title={i18n('tip')}
          buttons={[{ text: i18n('confirm'), type: 'primary' }]}
          style={{ width: 450, height: 'auto' }}
          onOverlayClick={this.close.bind(this)}
          onButtonClick={this.close.bind(this)}
          onClose={this.close.bind(this)}>
          <EmailAlert />
        </Dialog>
      </div>
    );
  }
}

export default NewMailVerify;
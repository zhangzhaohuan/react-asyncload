import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import i18n from '$i18n';

@inject('newMailStore')
@observer
class EmailAlert extends Component {
  constructor(props) {
    super(props);

    this.newMailStore = this.props.newMailStore;
  }
  render() {
    return (
      <div>
        {this.newMailStore.successList.length ?
          <div>
            <p>{i18n('send-success-alert')}</p>
            <div className="suc-email email-box">
              {this.newMailStore.successList.map((item, index) => {
                return <p key={index}>{item.email}</p>;
              })}
            </div>
          </div> : null
        }
        {this.newMailStore.failList.length ?
          <div>
            <p>{i18n('fail-list-alert')}</p>
            <div className="fail-email email-box">
              {this.newMailStore.failList.map((item, index) => {
                return <p key={index}>{item.email}<span className="error-reason">{item.message}</span></p>;
              })}
            </div>
          </div> : null
        }
        {this.newMailStore.existList.length ?
          <div>
            <p>{i18n('exist-email-alert')}</p>
            <div className="passed-email email-box">
              {this.newMailStore.existList.map((item, index) => {
                return <p key={index}>{item.email}</p>;
              })}
            </div>
          </div> : null
        }
      </div>
    );
  }
}

export default EmailAlert;
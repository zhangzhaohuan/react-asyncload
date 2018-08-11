import React, { Component } from 'react';
import { Alert } from '@ali/aps';
import './verifyTip.less';
import { TopBar } from 'components';
import { site } from 'domain-sdk-common/utils';
import i18n from '$i18n';
// import * as sdk from 'common/sdk';

class VerifyTip extends Component {
  constructor() {
    super();
    this.knowMoreLinks = {
      'intl': ':/www.alibabacloud.com/help/doc-detail/62839.htm',
      'intlZh': '//www.alibabacloud.com/help/zh/doc-detail/62839.htm',
      'cn': '//help.aliyun.com/document_detail/62839.html'
    };
    this.knowmoreInlZh = '//www.alibabacloud.com/help/zh/doc-detail/62839.htm';
  }
  render() {
    // const site = sdk.common.utils.site();
    // const lang = window.currLang;
    return (
      <div>
        <TopBar title={i18n('email-verif-title')}></TopBar>
        <Alert type="warning">
          <p className="tip-content">
            {i18n('page-top-tip')}
            {
              site() == 'intl' ?
                <a
                  href={i18n('infoTemplate-learn-more')}
                  className="know-more" target='_blank'>{i18n('know-more')}</a> :
                <a
                  href='//help.aliyun.com/document_detail/62839.html'
                  className="know-more" target='_blank'>{i18n('know-more')}</a>
            }
            {/* <a
              href={lang == 'zh'
                ? this.knowMoreLinks.intlZh
                : this.knowMoreLinks[site]}
              target="_blank"
              className="know-more">{i18n('know-more')}</a> */}
          </p>
        </Alert>
      </div>
    );
  }
}

export default VerifyTip;
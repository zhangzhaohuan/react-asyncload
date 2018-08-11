import * as sdk from 'common/sdk';
import { i18n } from 'common';

export default class TransferDetail {
  stepData = [
    {
      status: 'wait',
      title: i18n('transfer-in-status-submit'),
      description: 'INIT'
    }, {
      status: 'wait',
      title: i18n('transfer-in-detail-email-verify'),
      description: 'AUTHORIZATION'
    }, {
      status: 'wait',
      title: '命名审核',
      description: 'NAME_VERIFICATION'
    },
    {
      status: 'wait',
      title: i18n('transfer-in-status-password-verification'),
      description: 'PASSWORD_VERIFICATION'
    },
    {
      status: 'wait',
      title: i18n('transfer-in-status-pending'),
      description: 'PENDING'
    },
    {
      status: 'wait',
      title: i18n('transfer-in-status-result'),
      description: ''
    }
  ];

  data = {};
  domainName = '';               //域名
  simpleTransferInStatus = '';   //转入状态
  progressBarType = 0;            //进度条节点数确定的依据
  resultMsg = '';                //结果信息
  expireDate = '';               //有效日期
  email = '';                      //邮箱
  gmtModified = '';               //修改时间
  visible = false;               //点击‘取消转入’dialog显示
  showTipSendEmail = false;      //点击‘重新发送’，信息提示显示
  showTipTransferCode = false;   //点击'提交验证'，信息提示显示
  params = {                     //请求参数
    saleId: ''
  };
  paramsTransferCode = {
    saleId: '',
    transferCode: ''
  }

  //初始化
  init = () => {
    this.paramsTransferCode.transferCode = '';
    this.paramsTransferCode.saleId = '';
    this.params.saleId = '';
  }
  //获取详情
  query = async () => {
    this.stepData = [
      {
        status: 'wait',
        title: i18n('transfer-in-status-submit'),
        description: 'INIT'
      }, {
        status: 'wait',
        title: i18n('transfer-in-detail-email-verify'),
        description: 'AUTHORIZATION'
      }, {
        status: 'wait',
        title: '命名审核',
        description: 'NAME_VERIFICATION'
      },
      {
        status: 'wait',
        title: i18n('transfer-in-status-password-verification'),
        description: 'PASSWORD_VERIFICATION'
      },
      {
        status: 'wait',
        title: i18n('transfer-in-status-pending'),
        description: 'PENDING'
      },
      {
        status: 'wait',
        title: i18n('transfer-in-status-result'),
        description: ''
      }
    ];
    const params = this.params;
    // console.log(params);
    const result = await sdk.services.management.transferIn.queryTransferIn(params);
    this.data = result.data;
    this.domainName = this.data.domainname;                           //域名
    this.simpleTransferInStatus = this.data.simpleTransferInStatus;   //转入状态
    this.resultMsg = this.data.resultMsg;                             //结果信息
    this.expireDate = this.data.expireDate;                           //有效时间
    this.email = this.data.email;                                     //邮箱  
    this.gmtModified = this.data.gmtModified;                         //修改时间
    this.progressBarType = this.data.progressBarType;
    this.confirmStepNum();
    this.confirmStep();
  }

  //取消转入
  queryCancelTransfer = async () => {
    const params = this.params;
    // console.log(params);
    const result = await sdk.services.management.transferIn.cancelTransfer(params);
    result.code == 200 ? this.query() : '';
  }

    //dialog：点击关闭
  close = () => {
    this.visible = false;
  }
  
    //点击button：确定取消/继续转入
  onBtnClick = (e) => {
      //确定取消：e.detail == 0; 继续转入:e.detail == 1
    if (e.detail == 0) {
      this.queryCancelTransfer();
      this.close();
    } else {
      this.close();
    }
  }
  

  //重新输入转移密码
  queryTransferCode = async () => {
    const params = this.paramsTransferCode;
    console.log(params);
    const result = await sdk.services.management.transferIn.reenterTransferCode(params);
    result.code == 200 ? this.showTipTransferCode = true : '';
    console.log(result);
  }

  //通过whois查询
  whiosQuery = () => {
    let tempwindow = window.open('_blank');
    const url = `//whois.aliyun.com/whois/domain/${this.domainName}?file=${this.domainName}`;
    tempwindow.location = url;
  }

  //重发验证邮件
  queryResendMailToken = async () => {
    const params = this.params;
    const result = await sdk.services.management.transferIn.resendMailToken(params);
    console.log(result);

    result.code == 200 ? this.showTipSendEmail = true : '';
  }

  //重新获取邮箱
  queryRefetchWhoisEmail = async () => {
    const params = this.params;
    const result = await sdk.services.management.transferIn.refetchWhoisEmail(params);
    result.code == 200 ? this.query() : '';
  }

  //点击‘重新发送邮件’
  resendEmail = () => {
    this.queryResendMailToken();
  }

  //点击‘重新获取邮箱’
  retrieveEmail = () => {
    this.queryRefetchWhoisEmail();
  }

  //点击‘取消转入’
  cancle = () => {
    this.visible = true;
  }


  //信息提示dialog(授权转入(邮箱验证))
  onMesBtnClick = () => {
    this.closeMes();
  }

  //关闭信息提示弹窗
  closeMes = () => {
    this.showTipSendEmail = false;
    this.query();
  }

  //信息提示dialog:.转移密码验证
  onPwBtnClick = () => {
    console.log('123');

    this.closePw();
  }

  //关闭信息提示弹窗
  closePw = () => {
    this.showTipTransferCode = false;
    this.query();
  }

  // 确定步骤

  confirmStepNum = () => {
    if (this.progressBarType == 0) {
      return;
    } else if (this.progressBarType == 1) {
      this.stepData = [
        {
          status: 'wait',
          title: i18n('transfer-in-status-submit'),
          description: 'INIT'
        }, {
          status: 'wait',
          title: i18n('transfer-in-detail-email-verify'),
          description: 'AUTHORIZATION'
        },
        {
          status: 'wait',
          title: i18n('transfer-in-status-password-verification'),
          description: 'PASSWORD_VERIFICATION'
        },
        {
          status: 'wait',
          title: i18n('transfer-in-status-pending'),
          description: 'PENDING'
        },
        {
          status: 'wait',
          title: i18n('transfer-in-status-result'),
          description: ''
        }
      ];
    } else if (this.progressBarType == 2) {
      this.stepData = [
        {
          status: 'wait',
          title: i18n('transfer-in-status-submit'),
          description: 'INIT'
        },
        {
          status: 'wait',
          title: '命名审核',
          description: 'NAME_VERIFICATION'
        },
        {
          status: 'wait',
          title: i18n('transfer-in-status-password-verification'),
          description: 'PASSWORD_VERIFICATION'
        },
        {
          status: 'wait',
          title: i18n('transfer-in-status-pending'),
          description: 'PENDING'
        },
        {
          status: 'wait',
          title: i18n('transfer-in-status-result'),
          description: ''
        }
      ];
    } else {
      this.stepData = [
        {
          status: 'wait',
          title: i18n('transfer-in-status-submit'),
          description: 'INIT'
        },
        {
          status: 'wait',
          title: i18n('transfer-in-status-password-verification'),
          description: 'PASSWORD_VERIFICATION'
        },
        {
          status: 'wait',
          title: i18n('transfer-in-status-pending'),
          description: 'PENDING'
        },
        {
          status: 'wait',
          title: i18n('transfer-in-status-result'),
          description: ''
        }
      ];
    }

  }

  confirmStep = () => {
    if (this.simpleTransferInStatus == 'FAIL') {
      this.stepData.pop();
      this.stepData.push(
        {
          status: 'finish',
          title: i18n('transfer-in-status-failure')
        }
      );
    } else if (this.simpleTransferInStatus == 'SUCCESS') {
      this.stepData.pop();
      this.stepData.push(
        {
          status: 'finish',
          title: i18n('transfer-in-status-success')
        }
      );
    } else {
      for (let i = 0; i < this.stepData.length; i++) {
        if (this.stepData[i].description == this.simpleTransferInStatus) {
          this.stepData[i].status = 'finish';
        }
      }
    }
  }



}
import { get, post } from '../../common/request';
import { toUTCBySite } from '../../common/utils';

//获取一次性token
export async function getOnceToken() {
  const url = '/BatchOperationApi/fetchOnceToken.json';
  const rs = await post(url);
  return rs || {};
}

export async function saveTask(params) {
  const url = '/BatchOperationApi/SaveTaskInfo.json';
  const rs = await post(url, params);
  return rs || {};
}

//获取用户邮箱
export async function getUserEmail() {
  const rs = await get('/ContactApi/queryAccountProfileInfo.json');
  return rs || {};
}

//获取用户邮箱/手机号
export async function queryAccountProfileInfo() {
  const rs = await get('/ContactApi/queryAccountProfileInfo.json');
  return rs || {};
}

//获得手机号验证码/邮箱验证码
export async function getCode(url) {
  const rs = await post(url);
  return rs || {};
}

//发送转移锁验证码
export async function sendTransferLockCode() {
  const rs = await post('/transferLockApi/SendAuthCode.json');
  return rs || {};
}

//发送更新锁验证码
export async function sendUpdateLockCode() {
  const rs = await post('/updateLockApi/SendAuthCode.json');
  return rs || {};
}

//发送域名信息修改验证码 
export async function sendDnsInfoModifyCode() {
  const ul = '/ContactApi/SendAuthCode.json';
  const rs = await post(ul);
  return rs || {};
}

//发送隐私保护验证码
export async function sendAuthCode() {
  const ul = '/whoisProtectionApi/SendAuthCode.json';
  const rs = await post(ul);
  return rs || {};
}

//获取域名分组
export async function queryDomainGroup() {
  const rs = await get('/DomainGroupApi/queryDomainGroup.json');
  return rs || {};
}

//文件上传
export async function uploadFile(params) {
  const url = '/BatchOperationApi/upload.json';
  const rs = await post(url, params);
  return rs || {};
}

//批量注册页面邮箱验证码
export async function sendBulkRegisterCode() {
  const rs = await post('/BatchOperationApi/sendAuthCodeForActivate.json');
  return rs || {};
}

//批量续费页面邮箱验证码
export async function sendBatchRenewalCode() {
  const rs = await post('/BatchOperationApi/sendAuthCodeForRenew.json');
  return rs || {};
}

//批量转入页面邮箱验证码
export async function sendBatchIntoCode() {
  const rs = await post('/BatchOperationApi/sendAuthCodeForTransfer.json');
  return rs || {};
}

//查询批量任务列表(90天内)
export async function queryTaskInfoList(params) {
  //console.log('queryTaskInfoList', params);
  params = Object.assign({}, params);
  if (params.beginCreateTime) {
    params.beginCreateTime = toUTCBySite(params.beginCreateTime.value || params.beginCreateTime);
  }
  if (params.endCreateTime) {
    params.endCreateTime = toUTCBySite(params.endCreateTime.value || params.endCreateTime);
  }
  const url = '/BatchOperationApi/queryTaskInfoList.json';
  const rs = await get(url, params);
  return rs || {};
}

//查询批量任务详情列表
export async function queryTaskDetailList(params) {
  const url = '/BatchOperationApi/queryTaskDetailList.json';
  const rs = await get(url, params);
  return rs || {};
}


//查询批量操作历史列表(90天外)
export async function queryTaskInfoHistory(params) {
  const url = '/BatchOperationApi/queryTaskInfoHistory.json';
  const rs = await get(url, params);
  return rs || {};
}

//查询批量操作详情历史列表
export async function queryTaskDetailHistory(params) {
  const url = '/BatchOperationApi/queryTaskDetailHistory.json';
  const rs = await get(url, params);
  return rs || {};
}

//获取手机app认证的url
export async function getAppAuthUrl(params) {
  const url = '/DomainApi/getHavanaIvUrl.json';
  const rs = await get(url, params);
  return rs || {};
}
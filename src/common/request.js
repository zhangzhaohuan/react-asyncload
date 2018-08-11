import querystring from 'querystring';
import { isFunction, each } from 'ntils';
import { notification, Loading } from '@ali/aps';
import fetchJsonp from 'fetch-jsonp';
import { site } from './utils';
import htmlDecode from './htmlDecode';

const CREDENTIALS = 'include';
const CONTENT_TYPE = 'Content-Type';
const MULTIPART = 'multipart/form-data';
const URLENCODED = 'application/x-www-form-urlencoded';
const HEADEERS = { 'Accept': 'application/json', [CONTENT_TYPE]: URLENCODED };

//内建错误处理函数
async function processError(rs, opts) {
  let message = rs.message || rs.errorDetail || rs.msg;
  if (isFunction(opts.showError)) {
    opts.showError = await opts.showError(rs, opts);
  }
  if (opts.showError !== false) {
    notification.alert(message);
  }
  if (isFunction(opts.throwError)) {
    opts.throwError = await opts.throwError(rs, opts);
  }
  if (opts.throwError !== false) {
    throw new Error(message);
  }
  return rs;
}

//内建登录处理函数
//未登录将引导到对应的登录页进行登录，登录页必须是 https
async function processLogin(rs, opts) {
  let message = '您还未登录，继续操作需要先完成登录。';
  let buttonIndex = await notification.alert(message, {
    buttons: [{
      text: '现在就去登录', size: 'small', type: 'primary'
    }, {
      text: '暂不', size: 'small', shape: 'ghost'
    }]
  });
  if (buttonIndex == 0) {
    let authUrl = {
      'intl': '//account.aliyun.com/login/login.htm?oauth_callback={redirect}',
      'cn': '//account.aliyun.com/login/login.htm?oauth_callback={redirect}'
    }[site()];
    let loginUrl = authUrl.replace(
      '{redirect}', encodeURIComponent(location.href)
    );
    location.href = loginUrl;
  }
  if (opts.throwError !== false) throw new Error(message);
}

function toFormData(body) {
  const formData = new FormData();
  each(body, (name, value) => {
    formData.append(name, value);
  });
  return formData;
}

function getCommonParams() {
  const params = {};
  const { umToken, umidToken,
    ALIYUN_TAO_CONSOLE_CONSOLE_CONFIG = {}, APP_CONSOLE_CONFIG = {} } = window;
  params.umToken = umToken || umidToken;
  params._csrf_token = ALIYUN_TAO_CONSOLE_CONSOLE_CONFIG.SEC_TOKEN ||
    APP_CONSOLE_CONFIG.SEC_TOKEN;
  return params;
}

/**
 * 发起一个请求
 * @param {string} method HTTP method 或 jsonp
 * @param {string} url 请求的目标 URL
 * @param {object} params 请求参数对象
 * @param {object} opts 请求选项
 */
export async function request(method, url, params, opts) {
  opts = Object.assign({}, opts);
  params = Object.assign({}, params);
  let loading;
  if (opts.loading !== false) loading = await Loading.show();
  let isJSONP = method.toUpperCase() == 'JSONP';
  const commonParmas = getCommonParams();
  const headers = Object.assign({}, HEADEERS, opts.headers);
  const credentials = opts.credentials || CREDENTIALS;
  if (opts.multipart) delete headers[CONTENT_TYPE];
  let query, body;
  if (isJSONP || method == 'GET') {
    Object.assign(params, commonParmas);
    query = querystring.stringify(params);
  } else if (opts.formData || headers[CONTENT_TYPE] == MULTIPART ||
    opts.multipart) {
    query = querystring.stringify(commonParmas);
    Object.assign(params, commonParmas);
    body = toFormData(params);
  } else {
    query = querystring.stringify(commonParmas);
    Object.assign(params, commonParmas);
    body = querystring.stringify(params);
  }
  const res = isJSONP ?
    await fetchJsonp(`${url}?${query} `) :
    await fetch(query ? `${url}?${query} ` : url,
      { headers, credentials, method, body });
  if (loading) loading.close();
  const rs = await res.json();
  rs.data = htmlDecode(rs.data);
  if (rs.code == 200 || rs.msg == 'OK' || rs.success === true) return rs;
  if (rs.code == -99 || rs.msg == 'NOT_LOGINED') {
    return processLogin(rs, opts);
  }
  return processError(rs, opts);
}

/**
 * 发起一个 get 请求
 * @param {*} args 参数：url,param,opts
 */
export function get(...args) {
  return request('GET', ...args);
}

/**
 * 发起一个 post 请求
 * @param {*} args 参数：url,param,opts
 */
export function post(...args) {
  return request('POST', ...args);
}

/**
 * 发起一个 jsonp 请求
 * @param {*} args 参数：url,param,opts
 */
export function jsonp(...args) {
  return request('JSONP', ...args);
}

/**
 * 发起一个 put 请求
 * @param {*} args 参数：url,param,opts
 */
export function put(...args) {
  return request('PUT', ...args);
}

/**
 * 发真一个 delete 请求
 * @param {*} args 参数：url,param,opts
 */
export function del(...args) {
  return request('DELETE', ...args);
}

/**
 * 发起一个 patch 请求
 * @param {*} args 参数：url,param,opts
 */
export function patch(...args) {
  return request('PATCH', ...args);
}

request.request = request;
request.get = get;
request.post = post;
request.jsonp = jsonp;
request.put = put;
request.del = del;
request.patch = patch;

export default request;
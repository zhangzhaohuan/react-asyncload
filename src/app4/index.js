// const utils = require('../ntils');
import { toSplitCase } from '../ntils/index';
// import ntils from '../ntils/index';

function convertPath(path) {
  return path.split('/').map(item => toSplitCase(item)).join('/');
}

const features = [];
const req = require.context('./', true, /index\.js$/);
req.keys().forEach(function (key) {
  let matchInfo = /^\.\/([a-z0-9\-]+)\/index\.js$/i.exec(key);
  if (!matchInfo) return;
  let component = req(key).default;
  let path = '/' + convertPath(matchInfo[1]);
  let metaInfo = Object.assign({}, { path, component });
  features.push(metaInfo);
});
export {
  features
}
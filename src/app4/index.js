// const utils = require('../ntils');
import { toSplitCase } from '../ntils/index';
// import ntils from '../ntils/index';

function convertPath(path) {
  console.log(path.split('/') );
  
  return path.split('/').map(item => toSplitCase(item)).join('/');
}

const features = [];
const req = require.context('./', true, /index\.js$/);
console.log(req.keys());

req.keys().forEach(function (key) {
  let matchInfo = /^\.\/([a-z0-9\-]+)\/index\.js$/i.exec(key);
  console.log(matchInfo);
  
  if (!matchInfo) return;
  let component = req(key);  
  let path = '/' + convertPath(matchInfo[1]);
  let metaInfo = Object.assign({ path, component }, component.meta);
  features.push(metaInfo);
});

export {
  features
}
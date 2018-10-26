import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App5';
// import App2 from './App2';
// import App3 from './App3';
/*require context：动态生成路由*/
// import App4 from './App4';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

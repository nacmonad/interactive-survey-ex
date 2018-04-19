import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import "babel-polyfill"; //for IE 10 & 11

//var btransform = require("babel-core");

// btransform.transform("code", {
//   plugins: ["transform-runtime"]
// });

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

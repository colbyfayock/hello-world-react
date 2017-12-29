import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './components/app';

exports.prerender = function () {
  return ReactDOMServer.renderToString(<App />);
};
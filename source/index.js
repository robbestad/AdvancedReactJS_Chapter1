import React from 'react';
import {render} from 'react-dom';
import App from './app';
const rootEl = document.getElementById('app');
import '../assets/style.css'
const renderApp = (Component = App) => render(
  React.createElement(App),
  rootEl
);

if (module.hot) {
  module.hot.accept();
}

renderApp();

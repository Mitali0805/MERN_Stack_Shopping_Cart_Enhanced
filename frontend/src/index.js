import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Routes from './Routes';
import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(
  <React.StrictMode>
      <Routes/>
   {/* <footer className="f1">2020 Copyright:</footer> */}
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import BotConversation from './pages/BotConversation';
import Account from './pages/Account';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Home} />
        <Route path="/register" component={Home} />
        <Route path="/account" component={Account} />
        <Route path="/bot" component={BotConversation} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

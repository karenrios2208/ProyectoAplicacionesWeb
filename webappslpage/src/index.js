import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Home from './pages/Home';
import BotConversation from './pages/BotConversation';
import Account from './pages/Account';
import profile from './pages/Profile';




ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Redirect from = "/logout" to="/" />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Home} />
        <Route path="/register" component={Home} />
        <Route path="/updateC" component={profile} />
        <Route path="/account" component={Account} />
        <Route path="/profile" component={profile} />
        <Route path="/bot" component={BotConversation} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class Content extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={ Login } exact />
        <Route path="/search" component={ Search } />
        <Route path="/album/" component={ Album } exact />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile" component={ Profile } exact />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default Content;

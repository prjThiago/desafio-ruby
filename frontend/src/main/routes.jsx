import React from 'react';
import {Switch, Route, Redirect} from 'react-router';

import Home from '../components/home/home';
import User from '../components/user/user';
import UserList from '../components/user/userList';

export default props => (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/usuarios/:idusuario" component={User}/>
        <Route exact path="/listausuarios" component={UserList}/>
        <Redirect from="*" to="/" />
    </Switch>
)
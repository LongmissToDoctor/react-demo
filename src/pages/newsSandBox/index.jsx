import React from 'react';
import SideMenu from '../../components/sandbox/SideMenu';
import TopHeader from '../../components/sandbox/TopHeader';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './home/Home';
import UserList from './user-manage/UserList';
import RightList from './right-manage/RightList';
import RoleList from './right-manage/RoleList';
import Nopermission from './nopermission';

const SandBox = () => {
  return (
    <div>
      <SideMenu />
      <TopHeader />

      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/user-manage-list' component={UserList} />
        <Route path='/right-manage/role/list' component={RoleList} />
        <Route path='/right-manage/right/list' component={RightList} />

        <Redirect from='/' to='/home' exact />
        <Route path='*' component={Nopermission} />
      </Switch>
    </div>
  );
};

export default SandBox;

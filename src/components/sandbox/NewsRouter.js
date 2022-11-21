import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../../pages/newsSandBox/home/Home';
import UserList from '../../pages/newsSandBox/user-manage/UserList';
import RightList from '../../pages/newsSandBox/right-manage/RightList';
import RoleList from '../../pages/newsSandBox/right-manage/RoleList';
import Nopermission from '../../pages/newsSandBox/nopermission';
import NewsAdd from '../../pages/newsSandBox/news-manage/NewsAdd';
import NewsDraft from '../../pages/newsSandBox/news-manage/NewsDraft';
import NewsCategory from '../../pages/newsSandBox/news-manage/NewsCategory';
import Audit from '../../pages/newsSandBox/audit-manage/Audit';
import AuditList from '../../pages/newsSandBox/audit-manage/AuditList';
import Unpublished from '../../pages/newsSandBox/publish-manage/Unpublished';
import Published from '../../pages/newsSandBox/publish-manage/Published';
import Sunset from '../../pages/newsSandBox/publish-manage/Sunset';
import axios from '../../aok/instance';

const LocalRouterMap = {
  '/home': Home,
  '/user-manage/list': UserList,
  '/right-manage/role/list': RoleList,
  '/right-manage/right/list': RightList,
  '/news-manage/add': NewsAdd,
  '/news-manage/draft': NewsDraft,
  '/news-manage/category': NewsCategory,
  '/audit-manage/audit': Audit,
  '/audit-manage/list': AuditList,
  '/publish-manage/unpublished': Unpublished,
  '/publish-manage/published': Published,
  '/publish-manage/sunset': Sunset,
};

export default function NewsRouter() {
  const [BackRouteList, setBackRouteList] = useState([]);
  useEffect(() => {
    Promise.all([axios.get('/rights'), axios.get('/children')]).then(res => {
      const data = [...res[0].data, ...res[1].data];
      console.log(data, 'data---');
      setBackRouteList(data);
    });
  }, []);
  const {
    role: { rights },
  } = JSON.parse(localStorage.getItem('token'));
  const checkRoute = item => {
    return LocalRouterMap[item.key] && item.pagepermisson;
  };

  const checkUserPermission = item => {
    return rights.includes(item.key);
  };

  return (
    <div>
      <Switch>
        {BackRouteList.map(item => {
          if (checkRoute(item) && checkUserPermission(item)) {
            <Route path={item.key} key={item.key} component={LocalRouterMap[item.key]} exact />;
          } else {
            return null;
          }
        })}

        <Redirect from='/' to='/home' exact />
        {BackRouteList.length > 0 && <Route path='*' component={Nopermission} />}
      </Switch>
    </div>
  );
}

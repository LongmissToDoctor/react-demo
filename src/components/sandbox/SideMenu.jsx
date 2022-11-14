import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import {
  // withRouter,
  useHistory,
} from 'react-router-dom';
import './sideMenu.css';

const { Sider } = Layout;

const menuList = [
  {
    key: '/home',
    label: '首页',
    icon: null,
  },
  {
    key: '/user-manage',
    label: '用户管理',
    icon: null,
    children: [
      {
        key: '/user-manage/list',
        label: '用户列表',
        icon: null,
      },
    ],
  },
  {
    key: '/right-manage',
    label: '权限管理',
    icon: null,
    children: [
      {
        key: '/right-manage/role/list',
        label: '角色列表',
        icon: null,
      },
      {
        key: '/right-manage/right/list',
        label: '权限列表',
        icon: null,
      },
    ],
  },
];

const SideMenu = React.memo(props => {
  const history = useHistory();
  const onMenuClick = selector => {
    history.push(selector.key);
  };
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ background: 'rgb(44, 44, 148)' }}
    >
      <div className='logo'>全球新闻发布系统</div>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['1']}
        items={menuList}
        style={{ background: 'rgb(44, 44, 148)' }}
        onClick={onMenuClick}
      />
    </Sider>
  );
});

export default SideMenu;

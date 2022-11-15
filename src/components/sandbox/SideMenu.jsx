import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import axios from 'axios';
import {
  withRouter,
  // useHistory,
} from 'react-router-dom';
import './sideMenu.css';

const { Sider } = Layout;

const SideMenu = React.memo(props => {
  const history = props.history;
  const selectKeys = [props.location.pathname];
  console.log(selectKeys);
  const openKeys = ['/' + props.location.pathname.split('/')[1]];
  const [collapsed, setCollapsed] = useState(false);
  const [menuList, setMenuList] = useState([]);

  const onMenuClick = selector => {
    history.push(selector.key);
  };

  // todo 思考如何优雅处理数据
  const handleMenuListData = dataList => {
    for (let i = 0; i < dataList.length; i++) {
      if (!dataList[i]?.children?.length) {
        delete dataList[i].children;
      }
      if (dataList[i].children) {
        dataList[i].children = dataList[i].children.filter(item => !!item?.pagepermisson);
      }
    }
    return dataList;
  };

  useEffect(() => {
    axios.get('http://localhost:5000/rights?_embed=children').then(res => {
      const newData = handleMenuListData(res?.data);
      setMenuList(newData);
    });
  }, []);
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ background: 'rgb(44, 44, 148)' }}
    >
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className='logo'>全球新闻发布系统</div>
        <div style={{ overflow: 'scroll' }}>
          <Menu
            theme='dark'
            mode='inline'
            selectedKeys={selectKeys}
            defaultOpenKeys={openKeys}
            items={menuList}
            style={{ background: 'rgb(44, 44, 148)' }}
            onClick={onMenuClick}
          />
        </div>
      </div>
    </Sider>
  );
});

export default withRouter(SideMenu);

// const menuList = [
//   {
//     key: '/home',
//     label: '首页',
//     icon: null,
//   },
//   {
//     key: '/user-manage',
//     label: '用户管理',
//     icon: null,
//     children: [
//       {
//         key: '/user-manage/list',
//         label: '用户列表',
//         icon: null,
//       },
//     ],
//   },
//   {
//     key: '/right-manage',
//     label: '权限管理',
//     icon: null,
//     children: [
//       {
//         key: '/right-manage/role/list',
//         label: '角色列表',
//         icon: null,
//       },
//       {
//         key: '/right-manage/right/list',
//         label: '权限列表',
//         icon: null,
//       },
//     ],
//   },
// ];

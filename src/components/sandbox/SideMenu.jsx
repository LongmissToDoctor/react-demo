import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import axios from 'axios';
import {
  withRouter,
  // useHistory,
} from 'react-router-dom';

const { Sider } = Layout;

const SideMenu = React.memo(props => {
  const history = props.history;
  const selectKeys = [props.location.pathname];
  const openKeys = ['/' + props.location.pathname.split('/')[1]];
  const [collapsed, setCollapsed] = useState(false);
  const [menuList, setMenuList] = useState([]);

  const onMenuClick = selector => {
    history.push(selector.key);
  };

  const {
    role: { rights },
  } = JSON.parse(localStorage.getItem('token'));

  // todo 思考如何优雅处理数据
  const handleMenuListData = dataList => {
    dataList = dataList.filter(item => item?.pagepermisson && rights.includes(item.key));
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
      const copyData = JSON.parse(JSON.stringify(newData).replace(/title/gi, 'label'));
      setMenuList(copyData);
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

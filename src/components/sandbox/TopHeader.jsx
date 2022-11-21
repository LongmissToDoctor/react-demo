import React, { useCallback, useState } from 'react';
import { Layout, Dropdown, Menu, Avatar } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
const { Header } = Layout;

const TopHeader = React.memo(() => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();

  const {
    username,
    role: { roleName },
  } = JSON.parse(localStorage.getItem('token'));
  console.log(JSON.parse(localStorage.getItem('token')));

  const changeColoapsed = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
              {roleName}
            </a>
          ),
        },
        {
          key: '2',
          danger: true,
          label: '退出',
          onClick: () => {
            localStorage.removeItem('token');
            history.replace('/');
          },
        },
      ]}
    />
  );
  return (
    <Header
      className='site-layout-background'
      style={{
        padding: '0 16px',
      }}
    >
      {collapsed ? (
        <MenuUnfoldOutlined onClick={changeColoapsed} />
      ) : (
        <MenuFoldOutlined onClick={changeColoapsed} />
      )}
      <div style={{ float: 'right' }}>
        <span>欢迎{username}回来</span>
        <Dropdown overlay={menu}>
          <Avatar size='large' icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
});

export default TopHeader;

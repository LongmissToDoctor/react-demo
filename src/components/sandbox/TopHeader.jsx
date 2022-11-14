import React, { useCallback, useState } from 'react';
import { Layout, Dropdown, Menu, Avatar } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
const { Header } = Layout;

const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
            超级管理员
          </a>
        ),
      },
      {
        key: '2',
        danger: true,
        label: '退出',
      },
    ]}
  />
);

const TopHeader = React.memo(() => {
  const [collapsed, setCollapsed] = useState(false);

  const changeColoapsed = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);
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
        <span>欢迎admin回来</span>
        <Dropdown overlay={menu}>
          <Avatar size='large' icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
});

export default TopHeader;

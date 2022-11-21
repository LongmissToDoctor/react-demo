import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import axios from '../../aok/instance';

import './index.css';

const Login = () => {
  const history = useHistory();
  const onFinish = values => {
    axios
      .get(
        `/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`
      )
      .then(res => {
        const data = res.data;
        if (data?.length < 1) {
          message.error('用户名或密码不匹配');
        } else {
          localStorage.setItem('token', JSON.stringify(data[0]));
          history.replace('/');
        }
      });
  };

  return (
    <div style={{ background: 'rgb(35, 39, 65)', height: '100%' }}>
      <div className='form-container'>
        <div className='login-title'>全球发布管理系统</div>
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name='username'
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Username'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button' block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

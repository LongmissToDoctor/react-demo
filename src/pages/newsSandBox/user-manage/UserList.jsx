import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, Space, Switch, Modal, message } from 'antd';
import axios from '../../../aok/instance';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';

import UserForm from '../../../components/UserForm';

const UserList = React.memo(() => {
  const addFrom = useRef();
  const updateFrom = useRef();
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(false);
  const [cur, setCur] = useState(null);

  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      filters: [
        ...regionList.map(item => ({
          text: item.title,
          value: item.value,
        })),
        {
          text: '全球',
          value: '全球',
        },
      ],
      onFilter: (value, item) => {
        if (value === '全球') {
          return item.region === '';
        }
        return value === item.region;
      },
      render: region => {
        return <b>{region ? region : '全球'}</b>;
      },
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: role => role.roleName,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'address',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState, item) => {
        return (
          <Switch
            onChange={() => onChangeHandle(item)}
            checked={roleState}
            disabled={item.default}
          />
        );
      },
    },
    {
      title: '操作',
      render: item => {
        return (
          <Space>
            <Button
              danger
              shape='circle'
              icon={<DeleteOutlined />}
              disabled={item.default}
              onClick={() => deleteHandle(item)}
            ></Button>
            <Button
              type='primary'
              shape='circle'
              icon={<FormOutlined />}
              disabled={item.default}
              onClick={() => onUpdateHandle(item)}
            ></Button>
          </Space>
        );
      },
    },
  ];

  const onChangeHandle = item => {
    axios
      .patch(`/users/${item.id}`, {
        roleState: !item.roleState,
      })
      .then(res => {
        if (res.status === 200) {
          item.roleState = !item.roleState;
          setDataSource([...dataSource]);
        }
      });
  };

  const deleteHandle = item => {
    axios.delete(`/users/${item.id}`).then(res => {
      if (res.status === 200) {
        setDataSource(dataSource.filter(data => data.id !== item.id));
      } else {
        message.warn('网络异常，请稍后再试');
      }
    });
  };
  const onOk = () => {
    addFrom.current
      .validateFields()
      .then(res => {
        setOpen(false);
        addFrom.current.resetFields();
        axios
          .post('/users', {
            ...res,
            roleState: true,
            default: false,
          })
          .then(value => {
            setDataSource([
              ...dataSource,
              {
                ...value.data,
                role: roleList.filter(item => item.id === res.roleId)[0],
              },
            ]);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onUpdateOk = () => {
    updateFrom.current.validateFields().then(res => {
      setUpdateOpen(false);
      setDataSource(
        dataSource.map(item => {
          if (item.id === cur.id) {
            return {
              ...item,
              ...res,
              role: roleList.filter(data => data.id === res.roleId)[0],
            };
          }
          return item;
        })
      );
      axios.patch(`/users/${cur.id}`, res);
    });
  };

  const onUpdateHandle = item => {
    setUpdateOpen(true);
    setCur(item);
    setTimeout(() => {
      if (item.roleId === 1) {
        setIsUpdateDisabled(true);
      } else {
        setIsUpdateDisabled(false);
      }
      updateFrom.current.setFieldsValue(item);
    }, 100);
  };

  useEffect(() => {
    axios.get('/regions').then(res => {
      setRegionList(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get('/roles').then(res => {
      setRoleList(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get('/users?_expand=role').then(res => {
      setDataSource(res.data);
    });
  }, []);
  return (
    <div>
      <Button type='primary' onClick={() => setOpen(true)}>
        添加用户
      </Button>
      <Modal
        open={open}
        title='添加用户'
        okText='确定'
        cancelText='取消'
        onCancel={() => setOpen(false)}
        onOk={onOk}
      >
        <UserForm roleList={roleList} regionList={regionList} ref={addFrom} />
      </Modal>
      <Modal
        open={updateOpen}
        title='更新用户'
        okText='更新'
        cancelText='取消'
        onCancel={() => {
          setUpdateOpen(false);
          setIsUpdateDisabled(!isUpdateDisabled);
        }}
        onOk={onUpdateOk}
      >
        <UserForm
          roleList={roleList}
          regionList={regionList}
          ref={updateFrom}
          isUpdateDisabled={isUpdateDisabled}
        />
      </Modal>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 6 }}
        rowKey={item => item.id}
      />
    </div>
  );
});

export default UserList;

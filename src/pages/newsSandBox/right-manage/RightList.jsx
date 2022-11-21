import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, Modal, Popover, Switch } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { confirm } = Modal;

const RightList = React.memo(() => {
  const [dataSource, setDataSource] = useState([]);

  const onDeleteHandler = item => {
    if (item?.grade === 1) {
      setDataSource(dataSource.filter(data => data.id !== item.id));
      axios.delete(`http://localhost:5000/rights/${item.id}`);
    } else {
      let list = dataSource.filter(data => data.id === item.rightId);
      list[0].children = list[0].children.filter(data => data.id !== item.id);
      setDataSource([...dataSource]);
      axios.delete(`http://localhost:5000/children/${item.id}`);
    }
  };

  const showDeleteConfirm = item => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onDeleteHandler(item);
      },
      onCancel() {
        //
      },
    });
  };

  const onSwitchChange = item => {
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1;
    setDataSource([...dataSource]);
    if (item.grade === 1) {
      axios.patch(`http://localhost:5000/rights/${item.id}`, {
        pagepermisson: item.pagepermisson,
      });
    } else {
      axios.patch(`http://localhost:5000/children/${item.id}`, {
        pagepermisson: item.pagepermisson,
      });
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: id => <b>{id}</b>,
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: key => <Tag color='orange'>{key}</Tag>,
    },
    {
      title: '操作',
      render: item => (
        <div>
          <Button
            danger
            shape='circle'
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(item)}
          ></Button>
          <Popover
            style={{ textAlign: 'center' }}
            content={
              <div style={{ textAlign: 'center' }}>
                <Switch checked={!!item.pagepermisson} onChange={() => onSwitchChange(item)} />
              </div>
            }
            title='页面配置项'
            trigger={item.pagepermisson === undefined ? '' : 'click'}
          >
            <Button
              shape='circle'
              type='primary'
              icon={<EditOutlined />}
              disabled={item.pagepermisson === undefined}
            ></Button>
          </Popover>
        </div>
      ),
    },
  ];

  useEffect(() => {
    axios.get('http://localhost:5000/rights?_embed=children').then(res => {
      const list = res.data;
      list.forEach(item => {
        if (item.children && item.children.length === 0) {
          item.children = '';
        }
      });
      setDataSource(list);
    });
  }, []);
  return <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 6 }} />;
});

export default RightList;

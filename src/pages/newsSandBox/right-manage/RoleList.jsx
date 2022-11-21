import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Tree } from 'antd';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import axios from 'axios';

const RoleList = React.memo(() => {
  const [dataSource, setDataSource] = useState([]);
  const [rightList, setRightList] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentList, setCurrentList] = useState([]);
  const [currentId, setCurrentId] = useState(0);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '年龄',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '权限',
      key: 'rights',
      render: item => {
        return (
          <Space>
            <Button danger shape='circle' icon={<DeleteOutlined />} />
            <Button
              type='primary'
              shape='circle'
              icon={<FormOutlined />}
              onClick={() => {
                setCurrentList(item.rights);
                setOpen(true);
                setCurrentId(item.id);
              }}
            />
          </Space>
        );
      },
    },
  ];

  const onOk = () => {
    setOpen(false);
    // setDataSource(
    //   dataSource.map(item => {
    //     if (item.id === currentId) {
    //       return { ...item, rights: currentList };
    //     }
    //     return item;
    //   })
    // );
    axios.patch(`http://localhost:5000/roles/${currentId}`, {
      rights: currentList,
    });
  };

  const onCheck = checkKeys => {
    setCurrentList(checkKeys.checked);
  };

  useEffect(() => {
    axios.get('http://localhost:5000/roles').then(res => {
      setDataSource(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/rights?_embed=children').then(res => {
      setRightList(res.data);
    });
  }, []);

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
      <Modal title='权限分配' open={open} onOk={onOk} onCancel={() => setOpen(false)}>
        <Tree
          treeData={rightList}
          checkable
          checkedKeys={currentList}
          onCheck={onCheck}
          checkStrictly
        />
      </Modal>
    </div>
  );
});

export default RoleList;

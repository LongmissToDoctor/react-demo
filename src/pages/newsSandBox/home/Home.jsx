import React from 'react';
import axios from 'axios';

const Home = React.memo(() => {
  const onClickHandler = () => {
    // 查询 get
    // axios.get('http://localhost:5000/posts/1').then(res => {
    //   console.log(res.data, 'res----');
    // });
    // 新增 post
    // axios.post('http://localhost:5000/posts', {
    //   title: '333',
    //   author: '西门吹灯',
    // });
    // 修改  put
    // axios.put('http://localhost:5000/posts/2', {
    //   title: '1111-修改',
    // });
    // 局部修改 patch
    // axios.patch('http://localhost:5000/posts/2', {
    //   title: '1111-修改',
    // });
    // 删除 delete
    // axios.delete('http://localhost:5000/posts/2');
    // _embed  嵌入
    // axios.get('http://localhost:5000/posts?_embed=comments').then(res => {
    //   console.log(res);
    // });
    // _expand  拓展
    axios.get('http://localhost:5000/comments?_expand=post').then(res => {
      console.log(res.data);
    });
  };
  return <div onClick={onClickHandler}>Home</div>;
});

export default Home;

import React, { useCallback } from 'react';

const Login = () => {
  const btnClick = useCallback(() => {
    localStorage.setItem('token', '049137509145970');
  }, []);
  return (
    <div>
      Login
      <button onClick={btnClick}>登录</button>
    </div>
  );
};

export default Login;

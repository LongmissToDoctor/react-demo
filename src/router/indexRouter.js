import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from '../pages/login';
import SandBox from '../pages/newsSandBox';

const IndexRouter = () => {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path='/login' component={Login} />
          {/* <Route exact path='/' component={SandBox} /> */}
          <Route
            path='/'
            render={() => (localStorage.getItem('token') ? <SandBox /> : <Redirect to='/login' />)}
          />
        </Switch>
      </HashRouter>
    </div>
  );
};

export default IndexRouter;

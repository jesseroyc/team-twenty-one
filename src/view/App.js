// import './App.css';
import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Switch, NavLink } from 'react-router-dom';

import Routes from './routes/index';

export default props => {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/todos">Todos</NavLink>
      <Switch>
        {renderRoutes(Routes)}
      </Switch>
    </div>
  );
};
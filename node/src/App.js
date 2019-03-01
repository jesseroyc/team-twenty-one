import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Switch, NavLink } from 'react-router-dom';

import Routes from './routes/index';

import Home from './pages/Home';
import Todos from './pages/Todos';
import NotFound from './pages/NotFound';

export default props => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/todos">Todos</NavLink>
        </li>
      </ul>

      <Switch>
        {renderRoutes(Routes)}
      </Switch>
    </div>
  );
};
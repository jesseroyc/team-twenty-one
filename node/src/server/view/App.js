import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Switch, NavLink } from 'react-router-dom';

import Routes from './routes/index';
import Button from '@material-ui/core/Button';
import './App.css';

export default props => {
  return (
    <div>
      <div>
      
        <Button className="button">
            <NavLink to="/">Home</NavLink>
        </Button>
  
        <Button className="button">
            <NavLink to="/todos">Todos</NavLink>
        </Button>
      
      </div>
      
      <Switch>
        {renderRoutes(Routes)}
      </Switch>
    </div>
  );
};
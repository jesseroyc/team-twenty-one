import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Switch } from 'react-router-dom';
import Routes from './routes/index';

export default props => {
  return (
    <div>
      <Switch>
        {renderRoutes(Routes)}
      </Switch>
    </div>
  );
};

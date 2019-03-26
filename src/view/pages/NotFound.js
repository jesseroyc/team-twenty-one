import React from 'react';

export default ({ staticContext = {} }) => {
  staticContext.status = 404;
  return <h1>Oops 404, nothing here!</h1>;
};
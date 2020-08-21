import React, { Fragment } from 'react';

const NotFound = () => {
  return (
    <Fragment>
      <h1 className='lead text-primary'>
        <i className='fas fa-exclamation-triangle' /> Oops!!
      </h1>
      <p className='large'>This page does not exist</p>
    </Fragment>
  );
};

export default NotFound;
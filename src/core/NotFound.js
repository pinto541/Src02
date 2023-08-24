import React, { Fragment } from 'react';

import Copyright from './Copyright';
import WarningIcon from '@material-ui/icons/Warning';
import Typography from '@material-ui/core/Typography';

const NotFound = () => {
  return (
    <
    >
      <Typography variant='h3' gutterBottom>
        <WarningIcon style={{ fontSize: 50, color: '#FF7D00' }} /> Sorry, this page does not
        exist!
      </Typography>
      <Copyright />
    </>
  );
};

export default NotFound;

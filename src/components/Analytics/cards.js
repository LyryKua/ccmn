import React from 'react';
import {
  Person as PersonIcon,
  Poll as PollIcon,
  Timelapse as TimelapseIcon,
  MonetizationOn as MonetizationOnIcon
} from '@material-ui/icons';

export default [
  {
    title: 'Total Visitors',
    data: 42,
    icon: <PersonIcon
      fontSize={'large'}
      style={{ fontSize: '90px' }}
    />,
    color: '#6fbf73',
  },
  {
    title: 'Average Dwell Time',
    data: 42,
    icon: <PollIcon
      fontSize={'large'}
      style={{ fontSize: '90px' }}
    />,
    color: '#ed4b82',
  },
  {
    title: 'Peak Hour',
    data: 42,
    icon: <TimelapseIcon
      fontSize={'large'}
      style={{ fontSize: '90px' }}
    />,
    color: '#4dabf5',
  },
  {
    title: 'Conversion Rate',
    data: 42,
    icon: <MonetizationOnIcon
      fontSize={'large'}
      style={{ fontSize: '90px' }}
    />,
    color: '#ffcd38',
  },
];

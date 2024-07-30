import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const JicConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: true,
        },
        toolbar: {
          display: true,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: '/apps/jic/items',
      component: lazy(() => import('./items/Items')),
    },
    {
      path: '/apps/sgp/logs',
      component: lazy(() => import('./logs/Logs')),
    },
    {
      path: '/apps/sgp/users',
      component: lazy(() => import('./users/Users')),
    },
  ],
};

export default JicConfig;

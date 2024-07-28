import { lazy } from 'react';

const Error500PageConfig = {
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
      path: '/pages/errors/error-500',
      component: lazy(() => import('./Error500Page')),
    },
  ],
};

export default Error500PageConfig;

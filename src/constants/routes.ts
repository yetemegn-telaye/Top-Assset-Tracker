import React from 'react';
import Login from '../features/auth/Login';
import Dashboard from '../features/dashboard/Dashboard';
import TransferList from '../features/transfers/TransferList';
import TransferDetail from '../features/transfers/TransferDetail';
import NewTransferOrder from '../features/transfers/NewTransferOrder';
import InTransits from '../features/transfers/ReturnableList';
import Settings from '../features/settings/Settings';
import Notifications from '../features/notifications/Notifications';


export interface AppRoute {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
}

const routes: AppRoute[] = [
  {
    path: '/',
    component: Login,
    exact: true,
  },
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/transfers',
    component: TransferList,
  },
  {
    path: '/transfers/:id',
    component: TransferDetail,
  },
  {
    path: '/new-transfer',
    component: NewTransferOrder,
  },
  {
    path:'/in-transits',
    component: InTransits,
  },
  {
    path: '/notifications',
    component: Notifications,
  },
  {
    path: '/settings',
    component: Settings
  }
];

export default routes;

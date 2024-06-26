import React from 'react';
import Login from '../features/auth/Login';
import Dashboard from '../features/dashboard/Dashboard';
import TransferList from '../features/transfers/TransferList';
import TransferDetail from '../features/transfers/TransferDetail';
import NewTransferOrder from '../features/transfers/NewTransferOrder';
import InTransits from '../features/returnables/ReturnableList';
import Settings from '../features/settings/Settings';
import Notifications from '../features/notifications/Notifications';
import Alerts from '../features/alerts/Alerts';
import ReturnableList from '../features/returnables/ReturnableList';


export interface AppRoute {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
  protected?: boolean;
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
    protected: true,
  },
  {
    path: '/transfers',
    component: TransferList,
    protected: true,
  },
  {
    path: '/transfers/:id',
    component: TransferDetail,
    protected: true,
  },
  {
    path: '/new-transfer',
    component: NewTransferOrder,
    protected: true,
  },
  {
    path:'/returnables',
    component: ReturnableList,
    protected: true,
  },
  {
    path: '/notifications',
    component: Notifications,
    protected: true,
  },
  {
    path: '/alerts',
    component: Alerts,
    protected: true,
  },
  {
    path: '/settings',
    component: Settings,
    protected: true,
  }
];

export default routes;

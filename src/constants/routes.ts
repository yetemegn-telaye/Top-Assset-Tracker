import React from 'react';
import Login from '../features/auth/Login';
import Dashboard from '../features/dashboard/Dashboard';
import TransferList from '../features/transfers/TransferList';
import TransferDetail from '../features/transfers/TransferDetail';
import NewTransferOrder from '../features/transfers/NewTransferOrder';


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
];

export default routes;

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TransactionList from './components/TransactionList';
import PointList from './components/PointList';
import MonthlyPoints from './components/MonthlyPoints';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: 'transactions',
        Component: TransactionList,
      },
      {
        path: 'points',
        Component: PointList,
      },
      {
        path: 'monthly',
        Component: MonthlyPoints,
      },
      {
        path: '*',
        element: <div>404</div>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider as ReduxProvider } from "react-redux";

import router from '@/router'
import store from '@/store';
import { LoadingContextProvider } from './core/contexts';

import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <LoadingContextProvider>
        <RouterProvider router={router} />
      </LoadingContextProvider>
    </ReduxProvider>
  </React.StrictMode>,
)

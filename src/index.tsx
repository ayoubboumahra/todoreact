import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import router from './routes';
import { Provider } from 'react-redux';
import store from './store';


import './css/index.css';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <RouterProvider 
      router={router} 
      fallbackElement={<p>Chargement en cours..</p>}
    />
  </Provider>
);
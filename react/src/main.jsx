import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import { ContextProvider } from './contexts/ContextProvider.jsx';


import "././assets/css/app.css";
import "././assets/css/navbar.css";
import "././assets/css/dropdown.css";

import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router}/>
    </ContextProvider>
  </React.StrictMode>,
)

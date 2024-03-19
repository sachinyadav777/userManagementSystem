import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import Registration from './components/Registration';
// import Dashboard from './components/Dashboard';
// import Error from './components/Error';
// import Login from './components/Login';

// const appRouter = createBrowserRouter([{
//   path: "/",
//   element: <App />,
//   children:[
//     {
//       path: "/",
//       element: <Login />
//     },
//     {
//       path: "/Registration",
//       element: <Registration />
//     },
//     {
//       path: "/dashboard",
//       element: <Dashboard /> 
//     }
//   ],
//   errorElement: <Error />

// }]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    // <RouterProvider router={appRouter} />
    <BrowserRouter>
    <App />
    </BrowserRouter>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

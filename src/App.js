import { Route, Routes, Navigate } from 'react-router-dom';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import Error from './components/Error';
import Login from './components/Login';
import ProtectedRoutes from './Services/ProtectedRoutes';
// import { Outlet } from "react-router";

function App() {
  const Authenticate = JSON.parse(localStorage.getItem('newuser')) !== null;
  return (
    <Routes>
      <Route path="/" element={Authenticate ? <Navigate to={"/dashboard"} /> : <Login />} />
      <Route path="/registration" element={Authenticate ? <Navigate to={"/dashboard"} /> : <Registration />} />
      <Route path="/" element={<ProtectedRoutes />} >
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}


export default App;

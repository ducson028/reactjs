import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DataTable from './pages/DataTable';
import AddEditUser from './pages/AddEditUser';
import Login from './pages/Login';
import useUserStore from './store';  
import PrivateRoute from './PrivateRoute';  // Import PrivateRoute

function AppRoute() {
  const { users, setUsers } = useUserStore();  

  return (
    <Routes>
      {/* Route không cần đăng nhập */}
      <Route path="/" element={<Login />} />
      
      {/* Các route yêu cầu đăng nhập sẽ được bảo vệ bằng PrivateRoute */}
      <Route
        path="/datatable"
        element={
          <PrivateRoute>
            <DataTable users={users} setUsers={setUsers} />
          </PrivateRoute>
        }
      />
      <Route
        path="/data"
        element={
          <PrivateRoute>
            <DataTable users={users} setUsers={setUsers} />
          </PrivateRoute>
        }
      />
      <Route
        path="/add-edit"
        element={
          <PrivateRoute>
            <AddEditUser users={users} setUsers={setUsers} />
          </PrivateRoute>
        }
      />
      <Route
        path="/add-edit/:name"
        element={
          <PrivateRoute>
            <AddEditUser users={users} setUsers={setUsers} />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AppRoute;

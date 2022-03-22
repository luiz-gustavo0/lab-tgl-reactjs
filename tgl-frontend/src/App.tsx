import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { GlobalStyles } from 'styles/global';

import Login from 'pages/Login';
import Register from 'pages/Register';
import ResetPassword from 'pages/ResetPassword';
import ChangePassword from 'pages/ChangePassword';
import Home from 'pages/Home';
import NewBet from 'pages/NewBet';
import { Layout } from 'components';
import { PrivateRoutes } from 'components/PrivateRoutes';

function App() {
  return (
    <>
      <ToastContainer />
      <GlobalStyles />
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />
        <Route
          path='/new-bet'
          element={
            <PrivateRoutes>
              <NewBet />
            </PrivateRoutes>
          }
        />
        <Route path='auth' element={<Layout />}>
          <Route index element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='forgot-password' element={<ResetPassword />} />
          <Route path='reset-password/:token' element={<ChangePassword />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

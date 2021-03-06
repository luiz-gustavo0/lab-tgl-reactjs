import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { GlobalStyles } from 'styles/global';

const Login = lazy(() => import('pages/Login'));
const Register = lazy(() => import('pages/Register'));
const ResetPassword = lazy(() => import('pages/ResetPassword'));
const ChangePassword = lazy(() => import('pages/ChangePassword'));
const Home = lazy(() => import('pages/Home'));
const UserAccount = lazy(() => import('pages/UserAccount'));
const NewBet = lazy(() => import('pages/NewBet'));

import { Footer, Layout, PrivateRoutes, Spinner, CartModal } from 'components';

function App() {
  return (
    <>
      <ToastContainer />
      <GlobalStyles />
      <Suspense fallback={<Spinner full />}>
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
            path='/account'
            element={
              <PrivateRoutes>
                <UserAccount />
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
        <Footer />
      </Suspense>
      <CartModal />
    </>
  );
}

export default App;

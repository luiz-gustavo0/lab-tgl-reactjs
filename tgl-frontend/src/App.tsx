import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { GlobalStyles } from 'styles/global';

import { Auth } from 'pages/Auth';
import { ForgotPassword, Login, Register } from 'components/Form';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <GlobalStyles />
      <Routes>
        <Route path='/' element={<p>Home</p>} />
        <Route path='auth' element={<Auth />}>
          <Route index element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

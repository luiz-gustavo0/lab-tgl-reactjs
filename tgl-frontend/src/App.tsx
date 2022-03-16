import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { GlobalStyles } from 'styles/global';

import { Auth } from 'pages/Auth';
import { ForgotPassword, Login, Register } from 'components/Form';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path='/' element={<p>Home</p>} />
        <Route path='auth' element={<Auth />}>
          <Route index element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

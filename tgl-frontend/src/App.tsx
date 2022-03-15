import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Auth } from 'pages/Auth';
import { Login } from 'pages/Auth/components/Login';
import { Register } from 'pages/Auth/components/Register';
import { ForgotPassword } from 'pages/Auth/components/ForgotPassword';
import { GlobalStyles } from 'styles/global';

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

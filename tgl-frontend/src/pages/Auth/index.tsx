import { Outlet } from 'react-router-dom';

export const Auth = () => {
  return (
    <div>
      <p>Autentication</p>
      <Outlet />
    </div>
  );
};

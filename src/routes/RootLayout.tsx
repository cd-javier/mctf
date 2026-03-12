import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import GoatCounter from '../components/GoatCounter';

export default function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <>
      <GoatCounter />
      <Outlet />
    </>
  );
}

import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <Outlet />;
}

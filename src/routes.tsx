import type { RouteObject } from 'react-router-dom';

import RootLayout from './routes/RootLayout';
import Home from './routes/Home';
import About from './routes/About';
import Services from './routes/Services';
import Links from './routes/Links';
import ErrorPage from './routes/ErrorPage';
import {
  homepageLoader,
  bioLoader,
  servicesLoader,
  linksLoader,
} from './lib/loaders';

const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: null,
    children: [
      { path: '/', element: <Home />, loader: homepageLoader },
      { path: '/about', element: <About />, loader: bioLoader },
      { path: '/services', element: <Services />, loader: servicesLoader },
      { path: '/links', element: <Links />, loader: linksLoader },
    ],
  },
];

export default routes;

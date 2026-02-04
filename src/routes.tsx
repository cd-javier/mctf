import type { RouteObject } from 'react-router-dom';

import RootLayout from './routes/RootLayout';
import Home from './routes/Home';
import About from './routes/About';
import {
  homepageLoader,
  bioLoader,
  servicesLoader,
  linksLoader,
} from './lib/loaders';

const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home />, loader: homepageLoader },
      { path: '/about', element: <About />, loader: bioLoader },
      { path: '/services', loader: servicesLoader },
      { path: '/links', loader: linksLoader },
    ],
  },
];

export default routes;

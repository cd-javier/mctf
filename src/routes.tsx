import type { RouteObject } from 'react-router-dom';

import RootLayout from './routes/RootLayout';
import Home from './routes/Home';
import About from './routes/About';
import Services from './routes/Services';
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
      { path: '/services', element: <Services />, loader: servicesLoader },
      { path: '/links', loader: linksLoader },
    ],
  },
];

export default routes;

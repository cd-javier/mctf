import type { RouteObject } from 'react-router-dom';

import Root from './routes/Root';
import About from './routes/About';
import {
  homepageLoader,
  bioLoader,
  servicesLoader,
  linksLoader,
} from './lib/loaders';

const routes: RouteObject[] = [
  { path: '/', element: <Root />, loader: homepageLoader },
  { path: '/about', element: <About />, loader: bioLoader },
  { path: '/services', loader: servicesLoader },
  { path: '/links', loader: linksLoader },
];

export default routes;

import type { RouteObject } from 'react-router-dom';

import Root from './routes/Root';
import {
  homepageLoader,
  bioLoader,
  servicesLoader,
  linksLoader,
} from './lib/loaders';

const routes: RouteObject[] = [
  { path: '/', element: <Root />, loader: homepageLoader },
  { path: '/about-me', loader: bioLoader },
  { path: '/services', loader: servicesLoader },
  { path: '/links', loader: linksLoader },
];

export default routes;

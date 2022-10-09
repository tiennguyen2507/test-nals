import { useRoutes } from 'react-router-dom';
import routesConfig from './routerConfig';

const AppRoute = () => {
  const routes = useRoutes(routesConfig);

  return routes;
};

export default AppRoute;

import App from '../pages/App';
import NotFound from '../pages/NotFound';

const Routes = [
  {
    path: '/',
    exact: true,
    component: App
  },
  {
    component: NotFound
  },
];

export default Routes;
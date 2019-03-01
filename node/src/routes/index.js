import App from '../App';
import Home from '../pages/Home';
import Todos from '../pages/Todos';
import NotFound from '../pages/NotFound';

import loadData from '../pages/helpers/loadData';

const Routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/todos',
    component: Todos,
    loadData: () => loadData('todos')
  },
  {
    component: NotFound
  }
];

export default Routes;
import Home from '../pages/Home';
import Todos from '../pages/Todos';
import NotFound from '../pages/NotFound';
import Record from '../pages/Record';
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
    path: '/record/view',
    component: Record
  },
  {
    component: NotFound
  }
];

export default Routes;
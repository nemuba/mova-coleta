import Dashboard from './views/dashboard/Dashboard'
import Users from './views/pages/users/Users'
import User from './views/pages/users/User'
import NewUser from './views/pages/users/NewUser'
import Profile from './views/pages/profile/Profile'
import Collect from './views/pages/collect/Collect'
import NewCollect from './views/pages/collect/customer/NewCollect'

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { protected: true, path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { protected: true, path: '/users', exact: true, name: 'Usuários', component: Users },
  { protected: true, path: '/users/new', exact: true, name: 'Cadastrar usuário', component: NewUser },
  { protected: true, path: '/users/:id', exact: true, name: 'Informações do usuário', component: User },
  { protected: true, path: '/profile', exact: true, name: 'Perfil', component: Profile },
  { protected: true, path: '/collects', exact: true, name: 'Histórico de Solicitações', component: Collect },
  { protected: true, path: '/collects/new', exact: true, name: 'Solicitação de Coleta', component: NewCollect },
];

export default routes;

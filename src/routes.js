import Dashboard from './views/dashboard/Dashboard'
import Users from './views/pages/users/Users'
import User from './views/pages/users/User'
import NewUser from './views/pages/users/NewUser'
import Profile from './views/pages/profile/Profile'
import Collect from './views/pages/collect/Collect'
import NewCollect from './views/pages/collect/customer/NewCollect'
import CollectDetail from './views/pages/collect/admin/CollectDetail'
import Route from './views/pages/route/Route'
import NewRoute from './views/pages/route/NewRoute'
import RouteDetail from './views/pages/route/RouteDetail'
import Invite from './views/pages/invite/Invite'
import Settings from './views/pages/settings/Settings'
import NewSettings from './views/pages/settings/NewSettings'
import SettingsDetails from './views/pages/settings/SettingsDetails'
import Modules from './views/pages/modules/Modules'
import NewModule from './views/pages/modules/NewModule'
import ModuleDetails from './views/pages/modules/ModuleDetails'

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { protected: true, path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { protected: true, path: '/users', exact: true, name: 'Usuários', component: Users },
  { protected: true, path: '/users/new', exact: true, name: 'Cadastrar usuário', component: NewUser },
  { protected: true, path: '/users/:id', exact: true, name: 'Informações do usuário', component: User },
  { protected: true, path: '/profile', exact: true, name: 'Perfil', component: Profile },
  { protected: true, path: '/collects', exact: true, name: 'Histórico de Solicitações', component: Collect },
  { protected: true, path: '/collects/new', exact: true, name: 'Solicitação de Coleta', component: NewCollect },
  { protected: true, path: '/collects/:id', exact: true, name: 'Detalhes da solicitação', component: CollectDetail },
  { protected: true, path: '/routes', exact: true, name: 'Histórico de Rotas', component: Route },
  { protected: true, path: '/routes/new', exact: true, name: 'Criar Rota', component: NewRoute },
  { protected: true, path: '/routes/:id', exact: true, name: 'Detalhes da Rota', component: RouteDetail },
  { protected: true, path: '/invite', exact: true, name: 'Convidar cliente', component: Invite },
  { protected: true, path: '/settings', exact: true, name: 'Configurações', component: Settings },
  { protected: true, path: '/settings/new', exact: true, name: 'Cadastrar Configuração', component: NewSettings },
  { protected: true, path: '/settings/:id', exact: true, name: 'Atualizar Configuração', component: SettingsDetails },
  { protected: true, path: '/modules', exact: true, name: 'Módulos', component: Modules },
  { protected: true, path: '/modules/new', exact: true, name: 'Cadastrar Módulo', component: NewModule },
  { protected: true, path: '/modules/:id', exact: true, name: 'Atualizar Módulo', component: ModuleDetails },
];

export default routes;

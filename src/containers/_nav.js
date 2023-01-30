import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav = {
  admin: [
    {
      _tag: 'CSidebarNavItem',
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
      // badge: {
      //   color: 'info',
      //   text: 'NEW',
      // }
    },
    {
      _tag: 'CSidebarNavDropdown',
      name: 'Usuários',
      route: '/users',
      icon: 'cil-user',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'Listar',
          icon: 'cil-clipboard',
          to: '/users',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Cadastrar',
          icon: 'cil-plus',
          to: '/users/new',
        },
      ]
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Manutenção Coletas',
      to: '/collects',
      icon: 'cil-pencil',
    },
    {
      _tag: 'CSidebarNavDropdown',
      name: 'Manutenção de Rotas',
      route: '/routes',
      icon: 'cil-map',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'Listar',
          icon: 'cil-clipboard',
          to: '/routes',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Cadastrar',
          icon: 'cil-plus',
          to: '/routes/new',
        },
      ]
    },
    {
      _tag: 'CSidebarNavDivider',
      className: 'm-2'
    },
    {
      _tag: 'CSidebarNavDropdown',
      name: 'Configurações',
      route: '/settings',
      icon: 'cil-settings',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'Listar',
          icon: 'cil-clipboard',
          to: '/settings',
        },
        // {
        //   _tag: 'CSidebarNavItem',
        //   name: 'Cadastrar',
        //   icon: 'cil-plus',
        //   to: '/settings/new',
        // },
      ]
    },
    {
      _tag: 'CSidebarNavDropdown',
      name: 'Módulos',
      route: '/modules',
      icon: 'cil-notes',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'Listar',
          icon: 'cil-clipboard',
          to: '/modules',
        },
        // {
        //   _tag: 'CSidebarNavItem',
        //   name: 'Cadastrar',
        //   icon: 'cil-plus',
        //   to: '/modules/new',
        // },
      ]
    },
    //{
    //  _tag: 'CSidebarNavDropdown',
    //  name: 'Recicláveis',
    //  route: '/recyclables',
    //  icon: 'cil-recycle',
    //  _children: [
    //    {
    //      _tag: 'CSidebarNavItem',
    //      name: 'Listar',
    //      icon: 'cil-clipboard',
    //      to: '/recyclables',
    //    },
    //    {
    //      _tag: 'CSidebarNavItem',
    //      name: 'Cadastrar',
    //      icon: 'cil-plus',
    //      to: '/recyclables/new',
    //    },
    //  ]
    //},
  ],
  customer: [
    {
      _tag: 'CSidebarNavTitle',
      _children: ['Navegação'],
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    },
    {
      _tag: 'CSidebarNavDropdown',
      name: 'Solicitação de Coleta',
      route: '/collects',
      icon: <CIcon name="cil-leaf" customClasses="c-sidebar-nav-icon" />,
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'Listar',
          icon: 'cil-clipboard',
          to: '/collects',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Cadastrar',
          icon: 'cil-plus',
          to: '/collects/new',
        },
      ]
    },
  ],
  collector: [
    {
      _tag: 'CSidebarNavItem',
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    },
    {
      _tag: 'CSidebarNavDropdown',
      name: 'Rotas',
      to: '/routes',
      icon: <CIcon name="cil-map" customClasses="c-sidebar-nav-icon" />,
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'Listar',
          icon: 'cil-clipboard',
          to: '/routes',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Cadastrar',
          icon: 'cil-plus',
          to: '/routes/new',
        },
      ]
    }
  ],
  business: [
    {
      _tag: 'CSidebarNavItem',
      name: 'Dadshboard',
      to: '/dashboard',
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    },
    {
      _tag: 'CSidebarNavDropdown',
      name: 'Produtos',
      to: '/products',
      icon: <CIcon name="cil-leaf" customClasses="c-sidebar-nav-icon" />,
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'Listar',
          icon: 'cil-clipboard',
          to: '/products',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Cadastrar',
          icon: 'cil-plus',
          to: '/products/new',
        }
      ]
    },
    {
      _tag: 'CSidebarNavDropdown',
      name: 'Troca de Pontos',
      to: '/exchange',
      icon: <CIcon name="cil-dollar" customClasses="c-sidebar-nav-icon" />,
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'Histórico',
          icon: 'cil-clipboard',
          to: '/exchange',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Cadastrar',
          icon: 'cil-plus',
          to: '/exchange/new',
        }
      ]
    }
  ],
}

export default _nav

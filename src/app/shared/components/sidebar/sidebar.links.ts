import {UserRoles} from '../../../core/enums/user.enum';
import {IMenuGroup} from '../../../core/models/menulinks.interface';

const allRoles = [ UserRoles.player, UserRoles.player ];

export const groups: IMenuGroup[] = [
  {
    id: 'home',
    title: null,
    children: [{
      id: 'home',
      path: '/user',
      icon: '&#xf448;',
      title: 'Home',
      roles: allRoles,
      disabled: true
    }]
  },
  {
    id: 'admin',
    title: 'Administrator',
    children: [
      {
        id: 'admin_panel',
        path: '/admin',
        icon: '&#xf4b0;',
        title: 'Dashboard',
        roles: [ UserRoles.admin ],
        disabled: true
      },
      {
        id: 'match_manager',
        path: '/admin/match-manager',
        icon: '&#xf42d;',
        title: 'Match Manager',
        roles: [ UserRoles.admin ]
      },
      {
        id: 'user_management',
        path: '/admin/user-management',
        icon: '&#xf161;',
        title: 'User Management',
        roles: [ UserRoles.admin ]
      },
      {
        id: 'registration_requests',
        path: '/admin/registration-requests',
        icon: '&#xf1ac;',
        title: 'Registration Requests',
        roles: [ UserRoles.admin ]
      }
    ]
  },
  {
    id: 'bottom',
    title: null,
    children: [
      {
        id: 'bug_report',
        path: '/support/report-problem',
        icon: '&#xf134;',
        title: 'Report a Problem',
        roles: allRoles,
        disabled: true
      },
      {
        id: 'settings',
        path: '/settings',
        icon: '&#xf412;',
        title: 'Settings',
        roles: allRoles,
        disabled: true
      }
    ]
  }
];

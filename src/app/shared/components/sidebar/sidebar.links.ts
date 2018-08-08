import {UserRoles} from '../../../core/enums/user.enum';
import {IMenuGroup} from '../../../core/models/menulinks.interface';

const allRoles = [ UserRoles.Player, UserRoles.Player ];

export const groups: IMenuGroup[] = [
  {
    id: 'home',
    title: null,
    children: [{
      id: 'home',
      path: '/user',
      icon: '&#xf448;',
      title: 'Home',
      roles: allRoles
    }]
  },
  {
    id: 'admin',
    title: 'Administrator',
    children: [
      {
        id: 'admin_panel',
        path: '/admin',
        icon: '&#xf1ac;',
        title: 'Main Panel',
        roles: [ UserRoles.Admin ]
      },
      {
        id: 'registration_requests',
        path: '/admin/registration-requests',
        icon: '&#xf1ac;',
        title: 'Registration Requests',
        roles: [ UserRoles.Admin ]
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
        roles: allRoles
      },
      {
        id: 'settings',
        path: '/settings',
        icon: '&#xf412;',
        title: 'Settings',
        roles: allRoles
      }
    ]
  }
];

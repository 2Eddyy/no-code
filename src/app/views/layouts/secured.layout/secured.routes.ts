import { Routes } from '@angular/router';
import { RolesAccessService } from 'src/app/services/rolesaccess.service';

export const SECURE_ROUTES: Routes = [
    {
      path: 'projects',
      loadChildren: () =>
        import('./../../secured/project/project.module').then(
          (m) => m.ProjectModule
        ),
      canActivate: [RolesAccessService],
    },/* 
    {
      path: 'builder',
      loadChildren: () =>
        import('./../../secured/dashboard-editor/dashboard-editor.module').then(
          (m) => m.DashboardEditorModule
        ),
      canActivate: [RolesAccessService],
    }, */
    {
      path: 'builder',
      loadChildren: () =>
        import('./../../secured/editor/editor.module').then(
          (m) => m.EditorModule
        ),
      canActivate: [RolesAccessService],
    },
    {
      path: 'builder/:id',
      loadChildren: () =>
        import('./../../secured/editor/editor.module').then(
          (m) => m.EditorModule
        ),
      canActivate: [RolesAccessService],
    },
    {
      path: 'dashboard-editor',
      loadChildren: () =>
        import('./../../secured/dashboard-editor/dashboard-editor.module').then(
          (m) => m.DashboardEditorModule
        ),
      canActivate: [RolesAccessService],
    },
    {
      path: 'profile',
      loadChildren: () =>
        import('./../../secured/profile/profile.module').then(
          (m) => m.ProfileModule
        ),
      canActivate: [RolesAccessService],
    },
    {
      path: 'settings',
      loadChildren: () =>
        import('./../../secured/settings/settings.module').then(
          (m) => m.SettingsModule
        ),
      canActivate: [RolesAccessService],
    }
  ];
  
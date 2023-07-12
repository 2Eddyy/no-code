import { Routes } from '@angular/router';

export const PUBLIC_ROUTES: Routes = [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    },
    {
      path: 'login',
      loadChildren: () =>
        import('./../../public/login/login.module')
        .then((m) => m.LoginModule),
    },
    {
      path: 'register',
      loadChildren: () =>
        import('./../../public/register/register.module')
        .then((m) => m.RegisterModule),
    },
    {
      path: 'forgotpassword',
      loadChildren: () =>
        import('./../../public/forgotpassword/forgotpassword.module')
        .then((m) => m.ForgotPasswordModule),
    },  
    {
      path: 'forgot-success',
      loadChildren: () =>
        import('../../public/forgot-success/forgot-success-module')
        .then((m) => m.ForgotSuccessModule),
    },
    {
      path: 'register-success',
      loadChildren: () =>
        import('../../public/register-success/register-success-module')
        .then((m) => m.RegisterSuccessModule),
    },
    {
      path: 'domains',
      loadChildren: () =>
        import('./../../public/domains/domains.module')
        .then((m) => m.DomainsModule),
    },
    {
      path: 'support',
      loadChildren: () =>
        import('./../../public/support/support.module')
        .then((m) => m.SupportModule),
    }
  ];
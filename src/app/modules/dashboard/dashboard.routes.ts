import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { TenantListComponent } from '../tenant/views/tenant-list/tenant-list.component';
import { DashboardLayoutComponent } from '../../layouts/dashboard-layout/dashboard-layout.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { 
        path: 'tenants', 
        children: [
          { path: '', component: TenantListComponent },
          { path: 'create', loadComponent: () => import('../tenant/views/tenant-create/tenant-create.component').then(m => m.TenantCreateComponent) }
        ]
      },
      { path: 'plans', loadComponent: () => import('./views/plans/plans.component').then(m => m.PlansComponent) },
      { path: 'templates', loadComponent: () => import('./views/templates/templates.component').then(m => m.TemplatesComponent) },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

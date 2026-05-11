import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {
  isSidebarCollapsed = signal(false);
  userName = signal('System Admin');
  
  menuItems = [
    { name: 'Dashboard', icon: 'grid', route: '/dashboard/home' },
    { name: 'Tenants', icon: 'users', route: '/dashboard/tenants' },
    { name: 'Plans & Modules', icon: 'package', route: '/dashboard/plans' },
    { name: 'Templates', icon: 'layout', route: '/dashboard/templates' },
    { name: 'Settings', icon: 'settings', route: '/dashboard/settings' }
  ];

  toggleSidebar() {
    this.isSidebarCollapsed.update(v => !v);
  }
}

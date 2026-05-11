import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  stats = [
    { label: 'Total Tenants', value: '128', change: '+12%', icon: 'tenant', color: '#6366f1' },
    { label: 'Active Users', value: '12,450', change: '+8%', icon: 'users', color: '#22c55e' },
    { label: 'Total Revenue', value: '$84,200', change: '+18%', icon: 'revenue', color: '#f59e0b' },
    { label: 'Pending Invites', value: '45', change: '-2%', icon: 'invite', color: '#ef4444' }
  ];

  popularModules = [
    { name: 'Core HR', usage: 98, color: '#6366f1' },
    { name: 'Project Management', usage: 76, color: '#ec4899' },
    { name: 'Chat Service', usage: 64, color: '#06b6d4' },
    { name: 'Monitoring Tool', usage: 45, color: '#10b981' }
  ];

  recentActivities = [
    { type: 'Tenant Created', user: 'Amazon Tech', time: '2 hours ago', status: 'success' },
    { type: 'Subscription Renewed', user: 'Google Cloud', time: '4 hours ago', status: 'info' },
    { type: 'Module Added', user: 'Netflix Ent.', time: '6 hours ago', status: 'warning' },
    { type: 'New Admin Invited', user: 'Meta Platforms', time: '1 day ago', status: 'success' }
  ];
}

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tenant-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tenant-list.component.html',
  styleUrl: './tenant-list.component.scss'
})
export class TenantListComponent {
  tenants = signal([
    { id: 1, name: 'Amazon Tech', owner: 'Jeff B.', domain: 'amazon.onevo.com', status: 'Active', plan: 'Enterprise', users: 1250 },
    { id: 2, name: 'Google Cloud', owner: 'Sundar P.', domain: 'google.onevo.com', status: 'Active', plan: 'Professional', users: 840 },
    { id: 3, name: 'Meta Platforms', owner: 'Mark Z.', domain: 'meta.onevo.com', status: 'Pending', plan: 'Enterprise', users: 0 },
    { id: 4, name: 'Netflix Ent.', owner: 'Reed H.', domain: 'netflix.onevo.com', status: 'Suspended', plan: 'Basic', users: 210 }
  ]);

  getStatusClass(status: string) {
    return status.toLowerCase();
  }
}

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss'
})
export class PlansComponent {
  modules = signal([
    { id: 1, name: 'Core HR', status: 'Active', tenants: 128, type: 'Core' },
    { id: 2, name: 'Project Management', status: 'Active', tenants: 95, type: 'Add-on' },
    { id: 3, name: 'Enterprise Chat', status: 'Active', tenants: 64, type: 'Add-on' },
    { id: 4, name: 'AI Monitoring', status: 'Beta', tenants: 12, type: 'Future/AI' }
  ]);

  plans = signal([
    { id: 1, name: 'Basic', price: 0, tier: 'Free', status: 'Active' },
    { id: 2, name: 'Professional', price: 49, tier: 'Standard', status: 'Active' },
    { id: 3, name: 'Enterprise', price: 199, tier: 'Premium', status: 'Active' }
  ]);
}

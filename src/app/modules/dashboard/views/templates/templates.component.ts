import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.scss'
})
export class TemplatesComponent {
  roleTemplates = signal([
    { id: 1, name: 'Standard Corporate', roles: ['Admin', 'HR Manager', 'Line Manager', 'Employee'], updated: '2 days ago' },
    { id: 2, name: 'Small Business', roles: ['Admin', 'Manager', 'Staff'], updated: '1 week ago' },
    { id: 3, name: 'Tech Startup', roles: ['Founder', 'Lead Dev', 'Dev', 'Operations'], updated: '5 hours ago' }
  ]);

  departments = ['Human Resources', 'Engineering', 'Operations', 'Sales', 'Marketing'];
}

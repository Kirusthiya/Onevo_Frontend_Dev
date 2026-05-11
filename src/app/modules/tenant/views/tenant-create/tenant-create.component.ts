import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenant-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tenant-create.component.html',
  styleUrl: './tenant-create.component.scss'
})
export class TenantCreateComponent {
  currentStep = signal(1);
  totalSteps = 4;
  
  tenantForm: FormGroup;
  
  countries = [
    { name: 'Sri Lanka', code: 'LK', currency: 'LKR', timezone: 'Asia/Colombo' },
    { name: 'India', code: 'IN', currency: 'INR', timezone: 'Asia/Kolkata' },
    { name: 'United Kingdom', code: 'GB', currency: 'GBP', timezone: 'Europe/London' },
    { name: 'United States', code: 'US', currency: 'USD', timezone: 'America/New_York' }
  ];

  availableModules = [
    { id: 'core-hr', name: 'Core HR', description: 'Essential HR management features (Mandatory)', mandatory: true, selected: true, price: 0 },
    { id: 'proj-mgmt', name: 'Project Management', description: 'Task tracking and collaboration', selected: false, price: 15 },
    { id: 'chat', name: 'Internal Chat', description: 'Real-time team communication', selected: false, price: 10 },
    { id: 'monitoring', name: 'Activity Monitoring', description: 'Employee productivity tracking', selected: false, price: 25 }
  ];

  plans = [
    { id: 'monthly', name: 'Monthly Package', duration: 'Month', priceMultiplier: 1 },
    { id: 'yearly', name: 'Yearly Package', duration: 'Year', priceMultiplier: 10 },
    { id: 'demo', name: 'Free Trial (Demo)', duration: '14 Days', priceMultiplier: 0 }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.tenantForm = this.fb.group({
      basic: this.fb.group({
        companyName: ['', Validators.required],
        ownerEmail: ['', [Validators.required, Validators.email]],
        domain: ['', Validators.required],
        address: ['', Validators.required],
        legalEntity: ['', Validators.required],
        country: ['', Validators.required],
        currency: [{value: '', disabled: true}],
        timezone: [{value: '', disabled: true}]
      }),
      modules: this.fb.group({
        selectedIds: [['core-hr']]
      }),
      subscription: this.fb.group({
        planId: ['monthly', Validators.required],
        billingCycle: ['monthly']
      }),
      invites: this.fb.array([
        this.fb.control('', [Validators.email])
      ])
    });

    // Auto-set currency and timezone on country change
    this.tenantForm.get('basic.country')?.valueChanges.subscribe(countryCode => {
      const country = this.countries.find(c => c.code === countryCode);
      if (country) {
        this.tenantForm.get('basic.currency')?.setValue(country.currency);
        this.tenantForm.get('basic.timezone')?.setValue(country.timezone);
      }
    });
  }

  get inviteEmails() {
    return this.tenantForm.get('invites') as FormArray;
  }

  addInvite() {
    this.inviteEmails.push(this.fb.control('', [Validators.email]));
  }

  nextStep() {
    if (this.currentStep() < this.totalSteps) {
      this.currentStep.update(s => s + 1);
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
    }
  }

  toggleModule(moduleId: string) {
    const mod = this.availableModules.find(m => m.id === moduleId);
    if (mod && !mod.mandatory) {
      mod.selected = !mod.selected;
      const selected = this.availableModules.filter(m => m.selected).map(m => m.id);
      this.tenantForm.get('modules.selectedIds')?.setValue(selected);
    }
  }

  finish() {
    console.log('Submitting Tenant Data:', this.tenantForm.getRawValue());
    this.router.navigate(['/dashboard/tenants']);
  }
}

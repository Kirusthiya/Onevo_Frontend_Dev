import { Component, signal, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenant-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tenant-create.component.html',
  styleUrl: './tenant-create.component.scss'
})
export class TenantCreateComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  currentStep = signal(1);
  tenantForm: FormGroup;

  constructor() {
    this.tenantForm = this.fb.group({
      // Step 1
      name: ['', Validators.required],
      domain: ['', [Validators.required, Validators.pattern('^[a-z0-9-]+$')]],
      industry: ['', Validators.required],
      
      // Step 2
      country: ['sri-lanka', Validators.required],
      currency: ['LKR', Validators.required],
      timezone: ['Asia/Colombo', Validators.required],
      
      // Step 3
      package: ['core-hr', Validators.required],
      
      // Step 4
      adminEmail: ['', [Validators.required, Validators.email]],
      adminName: ['', Validators.required]
    });

    // Auto-update currency when country changes
    this.tenantForm.get('country')?.valueChanges.subscribe(country => {
      const currencyMap: Record<string, string> = {
        'sri-lanka': 'LKR',
        'india': 'INR',
        'singapore': 'SGD'
      };
      const timezoneMap: Record<string, string> = {
        'sri-lanka': 'Asia/Colombo',
        'india': 'Asia/Kolkata',
        'singapore': 'Asia/Singapore'
      };
      
      this.tenantForm.patchValue({
        currency: currencyMap[country] || 'USD',
        timezone: timezoneMap[country] || 'UTC'
      });
    });
  }

  nextStep() {
    if (this.canMoveForward()) {
      this.currentStep.update(s => s + 1);
    }
  }

  prevStep() {
    this.currentStep.update(s => s - 1);
  }

  canMoveForward(): boolean {
    const step = this.currentStep();
    if (step === 1) {
      return !!(this.tenantForm.get('name')?.valid && this.tenantForm.get('domain')?.valid);
    }
    if (step === 2) {
      return !!(this.tenantForm.get('country')?.valid && this.tenantForm.get('timezone')?.valid);
    }
    if (step === 3) {
      return !!this.tenantForm.get('package')?.valid;
    }
    return true;
  }

  finish() {
    if (this.tenantForm.valid) {
      console.log('Creating Tenant:', this.tenantForm.value);
      // Simulate API Call
      setTimeout(() => {
        this.router.navigate(['/dashboard/tenants']);
      }, 1500);
    }
  }
}

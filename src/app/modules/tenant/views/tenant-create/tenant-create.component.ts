import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray, FormControl } from '@angular/forms';
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
  
  // Dynamic steps based on configuration selection
  showEmployeeStep = signal(false);
  showRoleStep = signal(false);

  constructor() {
    this.tenantForm = this.fb.group({
      // Step 1: Organization
      name: ['', Validators.required],
      domain: ['', [Validators.required, Validators.pattern('^[a-z0-9-]+$')]],
      address: ['', Validators.required],
      legalEntity: ['', Validators.required],
      
      // Step 2: Localization
      country: ['sri-lanka', Validators.required],
      currency: ['LKR', Validators.required],
      timezone: ['Asia/Colombo', Validators.required],

      // Step 3: Config Selections (Dynamic Flags)
      enableEmployeeOnboarding: [false],
      enableRoleConfig: [false],
      
      // Step 4: Modules & Subscription
      selectedModules: this.fb.group({
        coreHr: [true], // Always true/must
        projectManagement: [false],
        chat: [false],
        monitoring: [false]
      }),
      subscriptionPlan: ['monthly', Validators.required], // monthly, yearly, trial

      // Step 5: Initial Configuration (Templates)
      monitoringMode: ['transparent'], // transparent, stealth
      leavePolicy: ['standard'],
      workingHours: ['9-5'],

      // Step 6: Admin/Owner
      adminEmail: ['', [Validators.required, Validators.email]],
      adminName: ['', Validators.required]
    });

    // Auto-update localization (still editable)
    this.tenantForm.get('country')?.valueChanges.subscribe(country => {
      this.updateLocalization(country);
    });

    // Watch config selections to adjust steps
    this.tenantForm.get('enableEmployeeOnboarding')?.valueChanges.subscribe(val => this.showEmployeeStep.set(val));
    this.tenantForm.get('enableRoleConfig')?.valueChanges.subscribe(val => this.showRoleStep.set(val));
  }

  updateLocalization(country: string) {
    const map: any = {
      'sri-lanka': { cur: 'LKR', tz: 'Asia/Colombo' },
      'india': { cur: 'INR', tz: 'Asia/Kolkata' },
      'singapore': { cur: 'SGD', tz: 'Asia/Singapore' }
    };
    if (map[country]) {
      this.tenantForm.patchValue({
        currency: map[country].cur,
        timezone: map[country].tz
      }, { emitEvent: false });
    }
  }

  // Navigation Logic
  nextStep() {
    const next = this.calculateNextStep(this.currentStep());
    this.currentStep.set(next);
  }

  prevStep() {
    const prev = this.calculatePrevStep(this.currentStep());
    this.currentStep.set(prev);
  }

  private calculateNextStep(current: number): number {
    if (current === 3) {
      if (this.showEmployeeStep()) return 10; // Use special IDs for dynamic steps
      if (this.showRoleStep()) return 11;
      return 4;
    }
    if (current === 10) { // After Employee step
      if (this.showRoleStep()) return 11;
      return 4;
    }
    if (current === 11) return 4; // After Role step
    return current + 1;
  }

  private calculatePrevStep(current: number): number {
    if (current === 4) {
      if (this.showRoleStep()) return 11;
      if (this.showEmployeeStep()) return 10;
      return 3;
    }
    if (current === 11) {
      if (this.showEmployeeStep()) return 10;
      return 3;
    }
    if (current === 10) return 3;
    return current - 1;
  }

  canMoveForward(): boolean {
    // Basic validation per step
    return true; // Simplified for UI development
  }

  finish() {
    if (this.tenantForm.valid) {
      console.log('Final Data:', this.tenantForm.value);
      this.router.navigate(['/dashboard/tenants']);
    }
  }
}

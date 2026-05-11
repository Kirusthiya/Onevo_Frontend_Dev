import { signal } from '@angular/core';

export const appLoading = signal<boolean>(false);
export const currentUser = signal<any>(null);
export const theme = signal<'light' | 'dark'>('light');

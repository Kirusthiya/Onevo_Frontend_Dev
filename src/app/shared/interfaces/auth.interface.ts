export interface CurrentUser {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  authenticated: boolean;
  user: CurrentUser | null;
  permissions: string[];
  activeModules: string[];
  mustChangePassword: boolean;
  mfaRequired: boolean;
  mfaSessionToken?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface MfaVerifyRequest {
  mfaSessionToken: string;
  code: string;
}

export interface ForcePasswordChangeRequest {
  email: string;
  currentPassword: string;
  newPassword: string;
}

// Role Related Interfaces
export interface RoleSummary {
  id: string;
  name: string;
  description: string;
  isSystem: boolean;
  permissionCount: number;
  createdAt: string;
  updatedAt?: string;
}

export interface RolePermission {
  id: string;
  code: string;
  description: string;
  module: string;
}

export interface RoleDetail {
  id: string;
  name: string;
  description: string;
  isSystem: boolean;
  permissions: RolePermission[];
  createdAt: string;
  updatedAt?: string;
}

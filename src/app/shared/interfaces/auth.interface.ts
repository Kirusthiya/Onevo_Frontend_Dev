export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  platform_role: string;
  
  // Optional for other flows
  authenticated?: boolean;
  user?: any;
  mfaRequired?: boolean;
  mfaSessionToken?: string;
  mustChangePassword?: boolean;
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

export interface CurrentUser {
  id: string;
  email: string;
  fullName: string;
}

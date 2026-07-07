import { z } from "zod";

export const AuthUser = z.object({
  id: z.string(),
  email: z.string().nullable(),
  role: z.string(),
  fullName: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  organization: z.string().nullable().optional(),
  profileCompleted: z.boolean().optional(),
  createdAt: z.string().optional(),
});
export type AuthUser = z.infer<typeof AuthUser>;

export const GetCurrentAuthUserResponse = z.object({
  user: AuthUser.nullable(),
});
export type GetCurrentAuthUserResponse = z.infer<typeof GetCurrentAuthUserResponse>;

export const ExchangeMobileAuthorizationCodeBody = z.object({
  code: z.string(),
  state: z.string(),
  code_verifier: z.string(),
  nonce: z.string().optional(),
});
export type ExchangeMobileAuthorizationCodeBody = z.infer<typeof ExchangeMobileAuthorizationCodeBody>;

export const ExchangeMobileAuthorizationCodeResponse = z.object({
  token: z.string(),
});
export type ExchangeMobileAuthorizationCodeResponse = z.infer<typeof ExchangeMobileAuthorizationCodeResponse>;

export const LogoutMobileSessionResponse = z.object({
  success: z.boolean(),
});
export type LogoutMobileSessionResponse = z.infer<typeof LogoutMobileSessionResponse>;

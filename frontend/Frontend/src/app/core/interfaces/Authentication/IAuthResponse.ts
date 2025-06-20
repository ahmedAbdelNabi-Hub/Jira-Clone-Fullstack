export interface IAuthResponse {
    token: string;
    refreshToken: string;
    expiration: string; // ISO 8601 string, e.g. "2025-04-04T12:00:00Z"
  }
  
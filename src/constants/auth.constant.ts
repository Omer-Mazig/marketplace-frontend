export const REGEX_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const PASSWORD_MESSAGE =
  "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character.";

export const USER_TIERS_OPTIONS = ["standard", "gold", "platinum"] as const;

export const ACCESS_TOKEN_STORAGE_KEY = "accessToken_marketplace";

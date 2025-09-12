import { env } from "../../config/env.js";
export const REGEX = {
  USERNAME: /^[A-Za-z][A-Za-z0-9_]{2,15}$/, // Starting with a letter (uppercase or lowercase), Containing only letters, numbers, and underscores, Having a length between 3 and 16 characters.
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, // Minimum length of 8 characters, At least one uppercase letter, At least one lowercase letter, At least one digit, At least one special character (e.g., !@#$%^&*)
};

export const OPTIONS = {
  cookieOptions: {
    httpOnly: true,
    secure: env.isProduction(),
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

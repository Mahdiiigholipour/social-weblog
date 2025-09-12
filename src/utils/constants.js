import { env } from "../core/config/environment.config.js";

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const REGEX = {
  USERNAME: /^[A-Za-z][A-Za-z0-9_]{2,15}$/, // Starting with a letter (uppercase or lowercase), Containing only letters, numbers, and underscores, Having a length between 3 and 16 characters.
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, // Minimum length of 8 characters, At least one uppercase letter, At least one lowercase letter, At least one digit, At least one special character (e.g., !@#$%^&*)
};

export const POST_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
};

export const OPTIONS = {
  cookieOptions: {
    httpOnly: true,
    secure: env.isProduction(),
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

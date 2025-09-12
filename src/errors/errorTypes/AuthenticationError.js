import { ERROR_CODES, HTTP_STATUS } from "../../utils/constants/Errors.js";
import { ApiError } from "../ApiError.js";
export class AuthenticationError extends ApiError {
  constructor(message = "Authentication failed", details = null) {
    super(
      message,
      HTTP_STATUS.UNAUTHORIZED,
      details,
      ERROR_CODES.AUTHENTICATION
    );
    this.name = "AuthenticationError";
  }

  static invalidCredentials() {
    return new AuthenticationError("Invalid username or password");
  }

  static invalidToken() {
    return new AuthenticationError("Invalid or malformed token");
  }

  static tokenExpired() {
    return new AuthenticationError("Token has expired");
  }

  static noToken() {
    return new AuthenticationError("No token provided");
  }
}

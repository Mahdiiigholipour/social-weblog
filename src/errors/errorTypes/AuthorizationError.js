import { HTTP_STATUS } from "../../utils/constants.js";
import { ApiError } from "../ApiError.js";

export class AuthorizationError extends ApiError {
  constructor(message = "Access denied", details = null) {
    super(message, HTTP_STATUS.FORBIDDEN, details, "AUTHORIZATION_ERROR");
    this.name = "AuthorizationError";
  }

  static isnufficientPermissions() {
    return new AuthorizationError("Insufficient permissions");
  }

  static roleRequired(requiredRole) {
    return new AuthorizationError(`Role required: ${requiredRole}`, {
      requiredRole,
    });
  }
}

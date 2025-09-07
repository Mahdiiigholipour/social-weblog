import { HTTP_STATUS } from "../../utils/constants";
import { ApiError } from "../ApiError.js";

export class EnvironmentVariableError extends ApiError {
  constructor(
    message = "Environment configuration error",
    variableName = null,
    details = null
  ) {
    super(
      message,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      details,
      "ENVIRONMENT_ERROR"
    );
    this.variableName = variableName;
  }

  static missingVariable(variableName, details = null) {
    let message = Array.isArray(variableName)
      ? "Some required environment variables are not set."
      : `Environment variable ${variableName} is required!`;

    return new EnvironmentVariableError(message, variableName, details);
  }

  static invalidFormat(variableName, expectedValue, details = null) {
    return new EnvironmentVariableError(
      `Environment variable '${variableName}' has invalid format. Expected: ${expectedValue}`,
      variableName,
      details
    );
  }

  toJson() {
    return {
      ...super.toJson(),
      variableName: this.variableName,
    };
  }
}

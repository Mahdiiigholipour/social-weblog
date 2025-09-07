import { HTTP_STATUS } from "../../utils/constants.js";
import { ApiError } from "../ApiError.js";

export class NotFoundError extends ApiError {
  constructor(resourse = "Resource", details = null) {
    super(
      `${resourse} not found`,
      HTTP_STATUS.NOT_FOUND,
      details,
      "NOT_FOUND_ERROR"
    );
    this.name = "NotFoundError";
  }

  static route(app) {
    app.use((req, res, next) => {
      res.status(404).json({ message: "route not found" });
    });
  }

  static user(userId) {
    return new NotFoundError("User", { userId });
  }

  static resource(resourceName, resourceId) {
    return new NotFoundError(resourceName, { resourceId });
  }
}

export const POST_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
};

export const USER_ROLES = {
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
  USER: "user",
  MODERATOR: "moderator",
};

export const MODEL_OPTIONS = {
  timestamps: true,
  underscored: true,
  freezeTableName: true,
  paranoid: true,
};

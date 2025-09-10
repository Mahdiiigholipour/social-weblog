import { DataTypes } from "sequelize";
import BaseModel from "./BaseModel.js";
import { POST_STATUS } from "../../utils/constants.js";

export default class Post extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: "user", key: "id" },
          onDelete: "CASCADE",
        },
        title: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: { len: [1, 255] },
        },
        content: {
          type: DataTypes.JSONB,
          allowNull: false,
          validate: { notEmpty: true },
        },
        image: { type: DataTypes.STRING(255) },
        status: {
          type: DataTypes.ENUM(Object.values(POST_STATUS)),
          defaultValue: POST_STATUS.DRAFT,
        },
        slug: { type: DataTypes.STRING(255), unique: true },
        views: { type: DataTypes.INTEGER, defaultValue: 0 },
      },
      {
        sequelize,
        modelName: "Post",
        tableName: "post",
        timestamps: true,
        indexes: [
          { fields: ["user_id"] },
          { fields: ["status"] },
          { fields: ["content"], using: "GIN" },
          {
            name: "post_views_desc",
            fields: [{ name: "views", order: "DESC" }],
          },
          {
            name: "posts_created_at_desc",
            fields: [{ name: "created_at", order: "DESC" }],
          },
        ],
      }
    );
  }

  static associate(models) {
    // User
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "author",
      onDelete: "CASCADE",
    });

    // Post category
    this.belongsToMany(models.Category, {
      through: models.PostCategory,
      as: "categories",
      foreignKey: "post_id",
      otherKey: "category_id",
    });

    // Post tag
    this.belongsToMany(models.Tag, {
      through: models.PostTag,
      as: "tags",
      foreignKey: "post_id",
      otherKey: "tag_id",
    });

    // Post like
    this.belongsToMany(models.User, {
      through: models.PostLike,
      foreignKey: "post_id",
      otherKey: "user_id",
      as: "liked_posts",
    });

    // Post comments
    this.hasMany(models.PostComment, {
      foreignKey: "post_id",
      as: "comments",
      onDelete: "CASCADE",
    });

    // Post bookmarks
    this.belongsToMany(models.User, {
      through: models.Bookmark,
      foreignKey: "post_id",
      otherKey: "user_id",
      as: "bookmarked_by",
    });
  }
}

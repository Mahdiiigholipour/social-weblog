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
          references: { model: "User", key: "id" },
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
          { fields: ["userId"] },
          { fields: ["status"] },
          { fields: ["content"], using: "GIN" },
          {
            name: "posts_views_desc",
            fields: { name: "views", order: "DESC" },
          },
          // { name: "posts_views_desc", fields: ["views"], order: "DESC" },
          {
            name: "posts_created_at_desc",
            fields: { name: "createdAt", order: "DESC" },
          },
          // {
          //   name: "posts_created_at_desc",
          //   fields: ["createdAt"],
          //   order: "DESC",
          // },
        ],
      }
    );
  }

  static associate(models) {
    // User
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "author",
      onDelete: "CASCADE",
    });

    // Post category
    this.belongsToMany(models.Category, {
      through: models.PostCategory,
      as: "categories",
      foreignKey: "postId",
      otherKey: "categoryId",
    });

    // Post tag
    this.belongsToMany(models.Tag, {
      through: models.PostTag,
      as: "tags",
      foreignKey: "postId",
      otherKey: "tagId",
    });

    // Post like
    this.belongsToMany(models.User, {
      through: models.PostLike,
      foreignKey: "postId",
      otherKey: "userId",
      as: "likedPosts",
    });

    // Post comments
    this.hasMany(models.PostComment, {
      foreignKey: "postId",
      as: "comments",
      onDelete: "CASCADE",
    });

    // Post bookmarks
    this.belongsToMany(models.User, {
      through: models.Bookmark,
      foreignKey: "postId",
      otherKey: "userId",
      as: "bookmarkedBy",
    });
  }
}

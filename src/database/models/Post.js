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
        user_id: {
          type: DataTypes.UUID,
          references: { model: "User", key: "id" },
        },
        title: { type: DataTypes.STRING(255), allowNull: false },
        content: { type: DataTypes.JSONB, allowNull: false },
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
          { fields: "userId" },
          { fields: "status" },
          { fields: "content", using: "GIN" },
          { fields: ["views"], order: "DESC" },
          { fields: ["createdAt"], order: "DESC" },
        ],
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "author",
      onDelete: "CASCADE",
    });

    this.belongsToMany(models.Category, {
      through: models.PostCategory,
      as: "categories",
      foreignKey: "postId",
      otherKey: "categoryId",
    });

    this.belongsToMany(models.Tag, {
      through: models.PostTag,
      as: "tags",
      foreignKey: "postId",
    });

    this.hasMany(models.PostLike, {
      foreignKey: "postID",
      as: "likes",
    });

    this.hasMany(models.PostComment, {
      foreignKey: "postID",
      as: "comments",
      onDelete: "CASCADE",
    });

    this.belongsToMany(models.User, {
      through: models.Bookmark,
      foreignKey: "postId",
      otherKey: "userID",
      onDelete: "CASCADE",
      as: "bookmarkedBy",
    });

    this.belongsToMany(models.User, {
      through: models.PostLike,
      foreignKey: "postId",
      as: "likedPosts",
    });
  }
}

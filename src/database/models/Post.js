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
          { fields: "user_id" },
          { fields: "status" },
          { fields: "content", using: "GIN" },
          { fields: ["views"], order: "DESC" },
          { fields: ["created_at"], order: "DESC" },
        ],
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "author",
      onDelete: "CASCADE",
    });

    this.belongsToMany(models.Category, {
      through: models.PostCategory,
      as: "categories",
      foreignKey: "post_id",
    });

    this.belongsToMany(models.Tag, {
      through: models.PostTag,
      as: "tags",
      foreignKey: "post_id",
    });

    this.hasMany(models.PostLike, {
      foreignKey: "post_id",
      as: "likes",
    });

    this.hasMany(models.PostComment, {
      foreignKey: "post_id",
      as: "comments",
      onDelete: "CASCADE",
    });

    this.belongsToMany(models.User, {
      through: models.Bookmark,
      foreignKey: "post_id",
      otherKey: "user_id",
      onDelete: "CASCADE",
      as: "bookmarked_by",
    });
  }
}

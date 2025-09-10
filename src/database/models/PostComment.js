import { DataTypes } from "sequelize";
import BaseModel from "./BaseModel.js";

export default class PostComment extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        postId: {
          type: DataTypes.UUID,
          references: {
            model: "Post",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        userId: {
          type: DataTypes.UUID,
          references: {
            model: "User",
            key: "id",
          },
          onDelete: "SET NULL",
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: { notEmpty: true },
        },
      },
      {
        sequelize,
        modelName: "PostComment",
        tableName: "post_comment",
        timestamps: true,
        indexes: [{ fields: ["postId"] }, { fields: ["userId"] }],
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    this.belongsTo(models.Post, {
      foreignKey: "postId",
      as: "post",
    });

    this.belongsToMany(models.User, {
      through: models.CommentLike,
      foreignKey: "commentId",
      otherKey: "userId",
      as: "likedBy",
    });
  }
}

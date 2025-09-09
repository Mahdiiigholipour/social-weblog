import { DataTypes } from "sequelize";
import { BaseModel } from "./BaseModel.js";
import { REGEX } from "../../utils/constants.js";

export default class User extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
          validate: { len: [3, 50], is: REGEX.USERNAME },
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: true,
          unique: true,
          validate: { isEmail: true, len: [5, 100] },
        },
        passwordHash: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "user",
        timestamps: true,
        hooks: {},
      }
    );
  }

  static associate(models) {
    this.hasOne(models.UserProfile, {
      foreignKey: "user_id",
      as: "profile",
      onDelete: "CASCADE",
    });

    this.hasMany(models.Post, {
      foreignKey: "user_id",
      as: "posts",
      onDelete: "CASCADE",
    });

    this.hasMany(models.PostComment, {
      foreignKey: "user_id",
      as: "comments",
      onDelete: "SET NULL",
    });

    this.hasMany(models.PostLike, {
      foreignKey: "user_id",
      as: "likes",
      onDelete: "SET NULL",
    });

    this.belongsToMany(models.Post, {
      through: models.Bookmark,
      foreignKey: "user_id",
      otherKey: "post_id",
      as: "bookmarked_post",
      onDelete: "CASCADE",
    });

    this.belongsToMany(models.PostComment, {
      through: models.CommentLike,
      foreignKey: "user_id",
      otherKey: "comment_id",
      as: "liked_Comment",
    });

    this.belongsToMany(models.User, {
      through: models.Follower,
      as: "followers",
      foreignKey: "following_id",
      otherKey: "follower_id",
    });

    this.belongsToMany(models.User, {
      through: models.Follower,
      as: "following",
      foreignKey: "follower_id",
      otherKey: "following_id",
    });
  }
}

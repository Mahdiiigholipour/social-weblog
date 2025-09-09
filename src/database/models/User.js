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
      foreignKey: "userID",
      as: "profile",
      onDelete: "CASCADE",
    });

    this.hasMany(models.Post, {
      foreignKey: "userId",
      as: "posts",
      onDelete: "CASCADE",
    });

    this.hasMany(models.PostComment, {
      foreignKey: "userId",
      as: "comments",
      onDelete: "SET NULL",
    });

    this.hasMany(models.PostLike, {
      foreignKey: "userId",
      as: "likes",
      onDelete: "SET NULL",
    });

    this.belongsToMany(models.Post, {
      through: models.Bookmark,
      foreignKey: "userId",
      otherKey: "postID",
      as: "bookmarkedPost",
      onDelete: "CASCADE",
    });

    this.belongsToMany(models.PostComment, {
      through: models.CommentLike,
      foreignKey: "userId",
      otherKey: "commentId",
      as: "likedComments",
    });

    this.belongsToMany(models.User, {
      through: models.Follower,
      as: "followers",
      foreignKey: "followingId",
      otherKey: "followerId",
    });

    this.belongsToMany(models.User, {
      through: models.Follower,
      as: "followings",
      foreignKey: "followerId",
      otherKey: "followingId",
    });
  }
}

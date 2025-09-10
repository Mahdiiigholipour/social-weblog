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
    // Profile
    this.hasOne(models.UserProfile, {
      foreignKey: "userId",
      as: "profile",
      onDelete: "CASCADE",
    });

    // Posts
    this.hasMany(models.Post, {
      foreignKey: "userId",
      as: "posts",
      onDelete: "CASCADE",
    });

    // Post bookmarks
    this.belongsToMany(models.Post, {
      through: models.Bookmark,
      foreignKey: "userId",
      otherKey: "postId",
      as: "bookmarkedPosts",
      onDelete: "CASCADE",
    });

    // Post likes
    this.belongsToMany(models.Post, {
      through: models.PostLike,
      foreignKey: "userId",
      as: "likedPosts",
      onDelete: "CASCADE",
    });

    // Post comments
    this.hasMany(models.PostComment, {
      foreignKey: "userId",
      as: "comments",
      onDelete: "SET NULL",
    });

    // Comment likes
    this.belongsToMany(models.PostComment, {
      through: models.CommentLike,
      foreignKey: "userId",
      otherKey: "commentId",
      as: "likedComments",
      onDelete: "CASCADE",
    });

    // Follower
    this.belongsToMany(models.User, {
      through: models.Follower,
      as: "followers",
      foreignKey: "followingId",
      otherKey: "followerId",
      onDelete: "CASCADE",
    });

    // Following
    this.belongsToMany(models.User, {
      through: models.Follower,
      as: "followings",
      foreignKey: "followerId",
      otherKey: "followingId",
      onDelete: "CASCADE",
    });
  }
}

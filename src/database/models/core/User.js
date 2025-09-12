import { DataTypes } from "sequelize";
import { BaseModel } from "../BaseModel.js";
import { REGEX } from "../../../utils/constants.js";
import { DatabaseError } from "../../../errors/index.js";
import { USER_ROLES } from "../../../utils/constants/Database.js";

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
        role: {
          type: DataTypes.ENUM(Object.values(USER_ROLES)),
          defaultValue: USER_ROLES.USER,
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
        indexes: [{ fields: ["role"] }],
        hooks: {
          beforeSave: (user, {}) => {
            user.username = user.username.toLowerCase();
          },
        },
      }
    );
  }

  static associate(models) {
    // Profile
    this.hasOne(models.UserProfile, {
      foreignKey: "user_id",
      as: "profile",
      onDelete: "CASCADE",
    });

    // Posts
    this.hasMany(models.Post, {
      foreignKey: "user_id",
      as: "posts",
      onDelete: "CASCADE",
    });

    // Post bookmarks
    this.belongsToMany(models.Post, {
      through: models.Bookmark,
      foreignKey: "user_id",
      otherKey: "post_id",
      as: "bookmarked_posts",
      onDelete: "CASCADE",
    });

    // Post likes
    this.belongsToMany(models.Post, {
      through: models.PostLike,
      foreignKey: "user_id",
      as: "liked_posts",
      onDelete: "CASCADE",
    });

    // Post comments
    this.hasMany(models.PostComment, {
      foreignKey: "user_id",
      as: "comments",
      onDelete: "SET NULL",
    });

    // Comment likes
    this.belongsToMany(models.PostComment, {
      through: models.CommentLike,
      foreignKey: "user_id",
      otherKey: "comment_id",
      as: "liked_comments",
      onDelete: "CASCADE",
    });

    // Follower
    this.belongsToMany(models.User, {
      through: models.Follower,
      as: "followers",
      foreignKey: "following_id",
      otherKey: "follower_id",
      onDelete: "CASCADE",
    });

    // Following
    this.belongsToMany(models.User, {
      through: models.Follower,
      as: "followings",
      foreignKey: "follower_id",
      otherKey: "following_id",
      onDelete: "CASCADE",
    });

    // Refresh token
    this.hasMany(models.RefreshToken, {
      foreignKey: "user_id",
      as: "refresh_token",
      onDelete: "CASCADE",
    });
  }

  static async NotExist(username) {
    const user = await this.findOne({ where: { username } });
    if (user) throw DatabaseError.conflict("User already exist.", { username });
    return true;
  }
}

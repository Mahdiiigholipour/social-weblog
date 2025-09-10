import { DatabaseError } from "../../errors/index.js";
import Database from "../config/sequelize.js";
import Bookmark from "./Bookmark.js";
import Category from "./Category.js";
import CommentLike from "./CommentLike.js";
import Follower from "./Follower.js";
import Post from "./Post.js";
import PostCategory from "./PostCategory.js";
import PostComment from "./PostComment.js";
import PostLike from "./PostLike.js";
import PostTag from "./PostTag.js";
import Tag from "./Tag.js";
import User from "./User.js";
import UserProfile from "./UserProfile.js";

const models = {
  Bookmark,
  Category,
  CommentLike,
  Follower,
  Post,
  PostCategory,
  PostComment,
  PostLike,
  PostTag,
  Tag,
  User,
  UserProfile,
};

export const initializeModels = async () => {
  try {
    console.log("😆");
    // Initialize all models
    Object.values(models).forEach((model) =>
      model.init(Database.getSequelize())
    );
    console.log("😆");
    // setup associations
    Object.values(models).forEach((model) => {
      if (model.associate) model.associate(models);
    });

    return models;
  } catch (error) {
    throw new DatabaseError("Model initialization failed:", error);
  }
};

export default models;

import { DatabaseError } from "../../errors/index.js";
import Database from "../config/sequelize.js";
import Bookmark from "./interaction/Bookmark.js";
import Category from "./core/Category.js";
import CommentLike from "./interaction/CommentLike.js";
import Follower from "./interaction/Follower.js";
import Post from "./content/Post.js";
import PostCategory from "./junction/PostCategory.js";
import PostComment from "./content/PostComment.js";
import PostLike from "./interaction/PostLike.js";
import PostTag from "./junction/PostTag.js";
import Tag from "./core/Tag.js";
import User from "./core/User.js";
import UserProfile from "./core/UserProfile.js";

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
    // Initialize all models
    Object.values(models).forEach((model) =>
      model.init(Database.getSequelize())
    );

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

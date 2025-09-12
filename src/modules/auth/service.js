import { User } from "../../database/models/index.js";
import { hashPassword } from "../../utils/passwordHashing.js";

export default class AuthService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  register = async (userDto) => {
    // 1: user not exist [OK]
    // 2: hashing password [Ok]
    // 3: generate tokens

    await this.userModel.NotExist(userDto.username);

    const hashedPassword = await hashPassword(userDto.password);

    const user = await this.userModel.create({
      username: userDto.username,
      passwordHash: hashedPassword,
    });

    return user;
  };
}

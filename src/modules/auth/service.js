import { User } from "../../database/models/index.js";
import { hashPassword } from "../../utils/passwordHashing.js";

export default class AuthService {
  async register(userDto) {
    // 1: user not exist [OK]
    // 2: hashing password [Ok]
    // 3: generate tokens

    await User.NotExist(userDto.username);

    const hashedPassword = await hashPassword(userDto.password);

    const user = await User.create({
      username: userDto.username,
      passwordHash: hashedPassword,
    });
  }
}

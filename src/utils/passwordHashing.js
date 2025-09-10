import { argon2id, hash, verify } from "argon2";

export const hashPassword = async (password) => {
  return await hash(password, { type: argon2id, hashLength: 50 });
};

export const verifyPassword = async (password, hashedPassword) => {
  await verify(hashedPassword, password);
};

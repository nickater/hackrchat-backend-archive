import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (plainPassword: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

  return hashedPassword;
};

export const comparePassword = async (
  inputtedPassword: string,
  storedPassword: string,
): Promise<boolean> => {
  const isSamePassword = await bcrypt.compare(inputtedPassword, storedPassword);

  return isSamePassword;
};

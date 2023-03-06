import { getHashedPassword } from "./get-hashed-password";

export function comparePasswords(currentHashedPassword: string, passwordToCompare: string) {
  return getHashedPassword(passwordToCompare) === currentHashedPassword
}
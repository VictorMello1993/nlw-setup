import { getHashedPassword } from "./get-hashed-password";

export function getComparedPassword(salt: string) {
  return function comparePasswords(currentHashedPassword: string, passwordToCompare: string) {
    return getHashedPassword(passwordToCompare, salt) === currentHashedPassword
  }
}
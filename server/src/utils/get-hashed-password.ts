import { createHash } from 'node:crypto'

export function getHashedPassword(password: string, salt: string) {
  return createHash('sha256').update(password + salt).digest('base64');
}
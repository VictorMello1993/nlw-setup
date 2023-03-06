import { createHash } from 'node:crypto'

export function getHashedPassword(password: string) {
  return createHash('sha256').update(password).digest('base64');
}
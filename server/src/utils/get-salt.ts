import { randomBytes } from 'node:crypto'

export function getSalt() {
  return randomBytes(128).toString('base64');
}
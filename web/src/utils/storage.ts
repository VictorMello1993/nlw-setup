export const getAuth = () => {
  const cookie = document.cookie.split('; ').find(cookie => cookie.startsWith('sessionId='))?.split('=')[1]

  if (cookie) {
    return cookie
  }

  return null
}

export const hasToken = () => getAuth() !== null

export const isAuthenticated = () => hasToken()
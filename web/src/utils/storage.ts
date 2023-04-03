const keyStorage = import.meta.env.VITE_KEY_STORAGE

export const saveAuth = (data: any) => localStorage.setItem(keyStorage, JSON.stringify(data))

export const getAuth = () => {
  const cookie = document.cookie.split('; ').find(cookie => cookie.startsWith('sessionId='))?.split('=')[1]

  if (cookie) {
    return cookie
  }

  return null
}


export const removeToken = () => localStorage.removeItem(keyStorage)

export const cleanToken = () => localStorage.clear()

export const hasToken = () => getAuth() !== null

export const isAuthenticated = () => hasToken()
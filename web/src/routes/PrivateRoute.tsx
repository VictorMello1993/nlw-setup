import { UserCredential } from "firebase/auth"
import { Navigate } from "react-router-dom"
import { isAuthenticated } from "../utils/storage"

interface PrivateRouteProps {
  children?: React.ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  return <>
    {isAuthenticated() ? children : <Navigate to="/signin" />}
  </>
}
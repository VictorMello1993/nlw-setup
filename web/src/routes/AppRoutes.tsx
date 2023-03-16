import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/home";
import { LoggedPage } from "../pages/Logged";
import { SignInForm } from "../pages/signin";
import { SignUpForm } from "../pages/signup";
import { PrivateRoute } from "./PrivateRoute";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/logged" element={
          <PrivateRoute>
            <LoggedPage />
          </PrivateRoute>}>
        </Route>
      </Routes>
    </BrowserRouter >
  )
}
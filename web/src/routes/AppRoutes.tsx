import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/home";
import { SignInForm } from "../pages/signin";
import { SignUpForm } from "../pages/signup";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
      </Routes>
    </BrowserRouter>
  )
}
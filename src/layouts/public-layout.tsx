import Footer from "@/sections/footer"
import Header from "@/sections/header"
import AuthHandler from "@/handlers/auth-handler"
import { Outlet } from "react-router-dom"

export const PublicLayout = () => {
  return (
    <div className="w-full">
      <AuthHandler/>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
import Footer  from "@/sections/footer"
import Header from "@/sections/header"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
        <Header/>
        <main>        
          <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default MainLayout
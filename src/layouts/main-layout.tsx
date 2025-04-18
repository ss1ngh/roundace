import Footer  from "@/sections/footer"
import Header from "@/sections/header"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
        <Header/>
        <main>        
          <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default MainLayout
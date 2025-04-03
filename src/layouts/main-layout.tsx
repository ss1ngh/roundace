import Footer  from "@/components/footer"
import Header from "@/components/header"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
        <Header/>

        <Outlet/>

        <Footer/>
    </div>
  )
}

export default MainLayout
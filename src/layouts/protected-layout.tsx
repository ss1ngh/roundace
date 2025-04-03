import LoaderPage from "@/pages/LoaderPage"
import { useAuth } from "@clerk/clerk-react"
import { Navigate } from "react-router-dom"

const ProtectRoutes = ({children} : {children : React.ReactNode}) => {
    const {isLoaded, isSignedIn} = useAuth()

    if(!isLoaded){
        return <LoaderPage/>
    }

    if(!isSignedIn){
        return <Navigate to="/signin" /> 
    }

    return <>{children}</>
}

export default ProtectRoutes
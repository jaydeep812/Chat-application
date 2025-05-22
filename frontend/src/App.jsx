import Navbar from "./components/Navbar"
import {Routes, Route} from 'react-router-dom'
import HomePage from "./pages/HomePage"
import Signup from "./pages/SignUpPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import {Loader} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import LoginPage from "./pages/LoginPage"
import { Navigate } from "react-router-dom"
import {useThemeStore} from './store/useThemeStore'

const App = ()=>{
  const navigate = useNavigate()
  const {theme} = useThemeStore()
  const {authUser,checkAuth, isCheckingAuth,onlineUsers} = useAuthStore()
  console.log('online users:',onlineUsers)
  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  console.log({authUser})
  if(isCheckingAuth && !authUser){
    return <div className="flex items-center justify-center h-screen">
      <Loader className="animate-spin size-10"/>
    </div>
  }
  return <div data-theme={theme}>
    <Toaster position="top-center" reverseOrder={false} />
    <Navbar />

    <Routes>
      <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/signup" />}></Route> */
      <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />}></Route>
      <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />}></Route>
      <Route path="/settings" element={<SettingsPage />}></Route>
      <Route path="/profile" element={authUser ? <ProfilePage /> :<Navigate to="/login" />}></Route>
    </Routes>
  </div>
}
export default App


import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route ,Routes} from 'react-router-dom'
import Landing from './pages/landing'
import Login from './pages/Login'
import './bootstrap.min.css'
import UserRegister from './pages/UserRegister'
import EmployeeRegister from './pages/EmployeeRegister'
import LandingHome from './pages/LandingHome'
import MessageDash from './pages/MessageDash'
import UserProfile from './pages/userProfile'
import { Toaster } from 'react-hot-toast'
function App() {

  return (
    <>
 
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/UserRegister' element={<UserRegister/>}/>
          <Route path='/EmployeeRegister' element={<EmployeeRegister/>}/>
          <Route path='/landinghome' element={<LandingHome/>}/>
          <Route path='/Message/:id' element={<MessageDash/>}/>
          <Route path='/user/:id' element={<UserProfile/>}/>


          <Route path='*' element={<h1>Page Not Found 404 !<h1/></h1>}/>

        </Routes>
        <Toaster/>
    </>
  )
}

export default App

import { useAuth } from '../context/AuthContext'
import Login from '../components/AuthComponents/Login'
import Dashboard from '../components/AuthComponents/Dashboard'

function ProfileScreen () {

  const auth = useAuth()

  if (!auth.isLogged) {
    return <Login />
  } else {
    return <Dashboard />
  }
}

export default ProfileScreen

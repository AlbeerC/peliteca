import { useAuth } from '../context/AuthContext'
import Login from '../components/AuthComponents/Login'
import Signup from '../components/AuthComponents/Signup'
import Dashboard from '../components/AuthComponents/Dashboard'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

function ProfileScreen () {

  const Stack = createNativeStackNavigator()
  const auth = useAuth()

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {
        auth.isLogged ? 
        <Stack.Screen name="Dashboard" component={Dashboard} />
        :
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </>
      }
    </Stack.Navigator>
  )
}

export default ProfileScreen

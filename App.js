import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'
import ProfileScreen from './screens/ProfileScreen'
import { HomeIcon, SearchIcon, UserIcon } from './components/Icons'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import AuthProvider from './context/AuthContext'
import ApiProvider from './context/ApiContext'

const Tab = createBottomTabNavigator()

function App () {

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1}}>
        <AuthProvider>
          <ApiProvider>
            <NavigationContainer>
              <Tab.Navigator 
                screenOptions={{ headerShown: false, 
                tabBarStyle: { backgroundColor: '#000000'},
                tabBarInactiveTintColor: '#ffffff',
                tabBarActiveTintColor: '#a40990',
                }}
              >
                <Tab.Screen 
                  name="Inicio" 
                  component={HomeScreen}
                  options={{
                    title: 'Inicio',
                    tabBarIcon: () => <HomeIcon />,
                  }} 
                />
                <Tab.Screen 
                  name="Buscar" 
                  component={SearchScreen} 
                  options={{
                    title: 'Buscar',
                    tabBarIcon: () => <SearchIcon />,
                  }}
                />
                <Tab.Screen 
                  name="Mi Perfil" 
                  component={ProfileScreen} 
                  options={{
                    title: 'Mi Perfil',
                    tabBarIcon: () => <UserIcon />,
                  }}
                />
              </Tab.Navigator>
            </NavigationContainer>
          </ApiProvider>
        </AuthProvider>
      </SafeAreaView >
    </SafeAreaProvider>
  )
}

export default App;

import { View, Text, StyleSheet, ScrollView } from 'react-native'
import MainMovieList from '../components/MainMovieList'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DetailScreen from './DetailScreen'

const Stack = createNativeStackNavigator()

function HomeScreen () {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Movies" component={MainMovieList} />
        <Stack.Screen name="MovieDetail" component={DetailScreen}/>
      </Stack.Navigator>
  )
}

export default HomeScreen
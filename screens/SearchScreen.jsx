import { View, Text, StyleSheet } from 'react-native'
import SearchBar from '../components/Search/SearchBar'
import SearchResults from '../components/Search/SearchResults'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

function SearchScreen () {

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Search" component={SearchBar} />
      <Stack.Screen name="SearchResults" component={SearchResults} />
    </Stack.Navigator>
  )
}

export default SearchScreen

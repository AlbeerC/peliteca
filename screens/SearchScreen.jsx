import { View, Text, StyleSheet } from 'react-native'
import SearchResults from '../components/Search/SearchResults'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SearchView from '../components/Search/SearchView'

const Stack = createNativeStackNavigator()

function SearchScreen () {

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Search" component={SearchView} />
      <Stack.Screen name="SearchResults" component={SearchResults} />
    </Stack.Navigator>
  )
}

export default SearchScreen

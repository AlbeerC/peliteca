import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Home from '../components/Home'
import MovieContainer from '../components/MovieContainer'

function HomeScreen () {
  return (
    <ScrollView>
      <Home />
      <MovieContainer />
    </ScrollView>
  )
}

export default HomeScreen
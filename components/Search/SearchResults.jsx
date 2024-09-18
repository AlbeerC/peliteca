import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native'
import { useApi } from '../../context/ApiContext'
import { useNavigation } from '@react-navigation/native'
import Loading from '../Loading'

function SearchResults({ route }) {

  const { searchTerm } = route.params
  const api = useApi()
  const { fetchSearchMovie, searchMovie, getImageUrl, loading } = api
  const navigation = useNavigation()

  useEffect(() => {
    fetchSearchMovie(searchTerm)
  }, [searchTerm])

  const goToDetail = (movieId) => {
    navigation.navigate('MovieDetail', {id: movieId})
  }

  if (loading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
        <Text className='text-center text-xl py-3'>
            Resultados para:  
            <Text className='font-bold text-2xl px-3'> {searchTerm}</Text>
        </Text>
        <FlatList 
            data={searchMovie}
            numColumns={3}
            renderItem={({item}) => (
                <View style={styles.itemContainer}>
                    <Pressable onPress={() => goToDetail(item.id)}>
                        <Image 
                            style={styles.itemImage} 
                            source={{uri: getImageUrl(item.poster_path)}} 
                        />
                    </Pressable>
                </View>
            )}
            contentContainerStyle={styles.container}
            keyExtractor={item => item.id}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 40
    },
    itemContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemImage: {
        width: 120,
        height: 180,
    }
});

export default SearchResults

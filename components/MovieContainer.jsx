import { useEffect, useState } from 'react'
import Home from './Home'
import { Text, View, Image, FlatList, Dimensions, StyleSheet, Pressable } from 'react-native'
import { useApi } from '../context/ApiContext'
import LoadMore from './LoadMore'
import { useNavigation } from '@react-navigation/native'
import Loading from './Loading'

function MovieContainer () {

    const navigation = useNavigation()
    const api = useApi()
    const { fetchMovies, movies, loading, getImageUrl } = api
    const [selectedEndpoint, setSelectedEndpoint] = useState('popular')
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(1)
    }, [selectedEndpoint])

    useEffect(() => {
        fetchMovies(selectedEndpoint, page)
    }, [selectedEndpoint, page])

    const loadMore = () => {
        if (!loading) {
            setPage(prevPage => prevPage + 1)
        }
    }

    const handleFilterSelect = (filter) => {
        setSelectedEndpoint(filter)
    }


    const goToDetail = (movieId) => {
        navigation.navigate('MovieDetail', {id: movieId})
    }

    if (loading) {
        return <Loading />
    }
    
    return (
        <FlatList 
            data={movies}
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
            ListHeaderComponent={<Home
                onFilterSelect={handleFilterSelect} selectedFilter={selectedEndpoint}/> }
            ListFooterComponent={<LoadMore loadMore={loadMore} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.container}
        />
    )
}

export default MovieContainer

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20
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
})
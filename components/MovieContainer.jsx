import { useEffect, useState } from 'react'
import Home from './Home'
import { Text, View, Image, FlatList } from 'react-native'

function MovieContainer () {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=59a8b9ea3a6d0f0d1d790d8bb5f36d94")
            .then((response) => response.json())
            .then((data) => setMovies(data.results))
            .catch((error) => console.log(error))
    }, [])

    const posterPath = (url) => {
        return `https://image.tmdb.org/t/p/w92${url}`
    }
    
    return (
        <FlatList 
            data={movies}
            renderItem={({item}) => (
                <View>
                    <Text>{item.title}</Text>
                    <Image style={{width: 100, height: 150}} source={{uri: posterPath(item.poster_path)}} />
                </View>
            )}
            ListHeaderComponent={<Home />}
            keyExtractor={(item) => item.id}
        />
    )
}

export default MovieContainer

const styles = {
    container: {
        height: '100%'
    }
}
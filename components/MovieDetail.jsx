import { View, Text, Image, Pressable } from 'react-native'
import { useApi } from '../context/ApiContext'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { LinearGradient } from 'expo-linear-gradient'
import { useAuth } from '../context/AuthContext'
/* import { addToWatchList, addToWatched, addToTop5 } from '../helpers/firestore' */

function MovieDetail ( {movie} ) {

    const auth = useAuth()
    const isLogged = auth.isLogged
    const userId = auth.getUserId()

    const api = useApi()
    const { getBackdropUrl } = api

    const backdrop = getBackdropUrl(movie.backdrop_path)

    const formatDuration = (runtime) => {
        const hours = Math.floor(runtime / 60)
        const remainingMinutes = runtime % 60
      
        if (hours === 0) {
          return `${remainingMinutes} min`
        } else if (remainingMinutes === 0) {
          return `${hours}hr`
        } else {
          return `${hours}hr ${remainingMinutes}min`
        }
    }

    const formatDate = (date) => {
        if (!date) {
            return ''
        }
        try {
            const parsedDate = new Date(date)
            return parsedDate.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })
        } catch (error) {
            console.error('Error formatting date', error)
            return ''
        }
    }

    const renderStarIcons = (rating) => {
        const filledStars = Math.floor(rating / 2)
        const halfStar = rating % 2 !== 0
        const emptyStars = 5 - filledStars - (halfStar ? 1 : 0)
    
        const starIcons = []
    
        for (let i = 0; i < filledStars; i++) {
            starIcons.push(<MaterialIcons key={i} name="star" size={30} color="#FBAE3B" />)
        }
    
        if (halfStar) {
            starIcons.push(<MaterialIcons key='half' name="star-half" size={30} color="#FBAE3B" />)
        }
    
        for (let i = 0; i < emptyStars; i++) {
            starIcons.push(<MaterialIcons key={i + filledStars} name="star-border" size={30} color="#FBAE3B" />)
        }
    
        return starIcons
    }

    return (
        <View style={styles.container}>
            <View style={styles.backdropContainer}>
                <Image source={{uri: backdrop}} style={styles.backdrop} />
                {
                isLogged && 
                    <View>
                        <Pressable>
                            <Text>asd</Text>
                        </Pressable>
                    </View>
                }
                <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.7)']} // Degradado de transparente a negro
                    style={styles.gradient}
                />
            </View>
            <View style={styles.mainTextView}>
                <Text className='text-2xl font-bold text-center color-white'>
                    {movie.title}
                </Text>
                <Text className='py-3 color-gray-400 text-center'>
                    {movie.genres?.map(genre => genre.name).join(', ')}
                </Text>
                <View className='flex flex-row justify-center gap-x-2 my-2'>
                    {renderStarIcons(movie.vote_average)}
                </View>
            </View>
            <View className='flex flex-row justify-center gap-x-12'>
                <View className='px-3'>
                    <Text className='color-gray-400 text-center'>Lanzamiento</Text>
                    <Text className='text-center pt-1 font-bold text-base color-white'>{formatDate(movie.release_date)}</Text>
                </View>
                <View className='px-3'>
                    <Text className='color-gray-400 text-center'>Duración</Text>
                    <Text className='text-center pt-1 font-bold text-base color-white'>{formatDuration(movie.runtime)}</Text>
                </View>
            </View>
            <Text className='pt-10 px-3 text-justify text-base color-white' style={{lineHeight: 22}}>
                {movie.overview}
            </Text>
            <Text className='pt-10 color-gray-400 mt-auto mb-3' style={{lineHeight: 22}}>
                {movie.production_companies?.map(comp => comp.name).join(', ')}
            </Text>
        </View>
    )
}

export default MovieDetail

const styles = {
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#3A3A3A'
    },
    backdropContainer: {
        position: 'relative',
        width: '100%',
        height: 300,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '50%', // Ajusta la altura del degradado según sea necesario
    },
    backdrop: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    mainTextView: {
        padding: 10,
        justifyContent: 'center',
    },
}
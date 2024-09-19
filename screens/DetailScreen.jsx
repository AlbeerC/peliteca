import { useApi } from '../context/ApiContext'
import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import MovieDetail from '../components/MovieDetail'
import Loading from '../components/Loading'

function DetailScreen () {

    const route = useRoute()
    const { id } = route.params
    const api = useApi()
    const { fetchMovieDetails, movieDetails, loading } = api

    useEffect(() => {
        fetchMovieDetails(id)
    }, [id])

    if (loading || !movieDetails) {
        return <Loading />
    }

    return (
        <MovieDetail movie={movieDetails}/>
    )
}

export default DetailScreen
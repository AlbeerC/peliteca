import MovieContainer from "./MovieContainer"
import LoadMore from "./LoadMore"
import { View, Text } from "react-native"

function MainMovieList () {

    return (
        <View style={{backgroundColor: '#3A3A3A'}}>
            <MovieContainer />
        </View>
    )
}

export default MainMovieList
import { View, Text, ScrollView } from "react-native"
import Home from "./Home"
import MovieContainer from "./MovieContainer"

function Main () {

    return (
        <ScrollView style={styles.mainView}>
            <Home />
            <MovieContainer /> 
        </ScrollView>
    )
}

export default Main

const styles = {
    mainView: {
        flexGrow: 1,
    }
}
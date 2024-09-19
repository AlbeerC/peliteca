import SearchBar from './SearchBar'
import { View } from 'react-native'

function SearchView () {

    return (
        <View style={styles.container}>
            <SearchBar />
        </View>
    )
}

export default SearchView

const styles = {
    container: {
        backgroundColor: '#3A3A3A',
        height: '100%',
    }
}
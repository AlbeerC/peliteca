import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';

function SearchBar() {

    const navigation = useNavigation()
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigation.navigate('SearchResults', { searchTerm })
            setSearchTerm("")
        }
    }

    return (
        <View style={styles.searchContainer}>
            <Pressable onPress={handleSearch} className='px-2'>
                <FontAwesome name="search" size={24} color="#3A3A3A" />
            </Pressable>
            <TextInput
                style={styles.input}
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholder='Buscar película...'
                returnKeyType="done"
                onSubmitEditing={handleSearch}
            />
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 15,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        padding: 8,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginLeft: 10,
    },
    icon: {
        fontSize: 20,
        color: '#333',
    }
})

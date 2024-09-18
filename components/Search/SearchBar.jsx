import { View, TextInput, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'


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
            <Pressable onPress={handleSearch}>
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
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
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

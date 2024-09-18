import { Pressable, View, Text } from "react-native"

function FilterButttons ( {onFilterSelect, selectedFilter} ) {  

    return (
        <View style={styles.container}>
            <Pressable onPress={() => onFilterSelect('popular')}>
                <Text style={[styles.text, selectedFilter === 'popular' ? styles.buttonActive : null]}>
                    Novedades
                </Text>
            </Pressable>
            <Pressable onPress={() => onFilterSelect('top_rated')}>
                <Text style={[styles.text, selectedFilter === 'top_rated' ? styles.buttonActive : null]}>
                    Mejor valoradas
                </Text>
            </Pressable>
            <Pressable onPress={() => onFilterSelect('upcoming')}>
                <Text style={[styles.text, selectedFilter === 'upcoming' ? styles.buttonActive : null]}>
                    Próximamente
                </Text>
            </Pressable>
        </View>
    )
}

export default FilterButttons

const styles = {
    container: {
        flex: 1,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    buttonActive: {
        color: '#a40990',
    }
}
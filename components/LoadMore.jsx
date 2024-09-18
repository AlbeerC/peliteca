import { View, Pressable, Text } from "react-native"

function LoadMore ( {loadMore} ) {

    return (
        <View style={styles.container}>
            <Pressable onPress={loadMore} style={styles.button}>
                <Text style={styles.text}>Cargar más</Text>
            </Pressable>
        </View>
    )
}

export default LoadMore

const styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    text: {
        color: '#a40990',
        fontSize: 20,
        fontWeight: 'bold',
    }
}
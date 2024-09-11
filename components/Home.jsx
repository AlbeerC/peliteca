import { Text, ImageBackground, View, Image, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')

function Home () {
    
    return (
        <ImageBackground
            style={homeStyles} 
            source={require('../assets/images/batman-cover.jpg')}
        >
            <View style={homeStyles.overlay}>
                <Text style={homeStyles.title}>Peliteca</Text>

                <View style={homeStyles.gifContainer}>
                    <Image 
                        source={require('../assets/images/scrolldown.gif')} 
                        style={homeStyles.gif} 
                    />
                </View>
            </View>
        </ImageBackground>
    )
}

export default Home

const homeStyles = {
    height: height,
    width: width,
    flex: 1,

    overlay: {
        flex: 1,
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    title: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        fontFamily: 'Roboto'
    },

    gifContainer: {
        width: '100%',
        height: '85%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    gif: {
        width: 60,
        height: 60,
    }
}
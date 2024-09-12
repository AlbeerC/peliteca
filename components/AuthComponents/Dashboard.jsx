import { Pressable, Text, View, StyleSheet } from 'react-native'
import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react'

function Dashboard () {

    const auth = useAuth()
    const [username, setUsername] = useState('')

    useEffect(() => {
        const fetchUser = async () => {
            const user = await auth.getUser()
            if (user) {
                setUsername(user.username || user.displayName || "")
            }
        } 
        fetchUser()
    }, [])

    const handleLogout = async () => {
        await auth.logout()
    }
    
    return (
        <View style={styles.container}>
            <Pressable onPress={handleLogout}>
                <Text>Cerrar sesión</Text>
            </Pressable>
                <Text style={styles.user}>{username}</Text>
                <View style={styles.boxContainer}>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoBoxText}>Tiempo viendo películas:
                        </Text>
                        <Text style={styles.infoBoxText}>24h 3m</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoBoxText}>Películas vistas: 
                        </Text>
                        <Text style={styles.infoBoxText}>12</Text>
                    </View>
                </View>
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    user: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingVertical: 20
    },
    boxContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        gap: 10,
        justifyContent: 'center'
    },
    infoBox: {
        backgroundColor: '#3A3A3A',
        padding: 20,
        borderWidth: 1,
        borderColor: '#fff',
        maxWidth: '50%',
        textAlign: 'center',
    },
    infoBoxText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 5,
    },
})
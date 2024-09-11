import { Pressable, Text, View } from 'react-native'
import { useAuth } from '../../context/AuthContext'

function Dashboard () {

    const auth = useAuth()

    const handleLogout = async () => {
        await auth.logout()
    }
    
    return (
        <View>
            <Text>Dashboard</Text>
            <Pressable onPress={handleLogout}>
                <Text>Cerrar sesión</Text>
            </Pressable>
        </View>
    )
}

export default Dashboard
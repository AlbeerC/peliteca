import { View, Text, TextInput, Pressable, StyleSheet, Image, Button } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Signup() {

  const auth = useAuth()
  const navigation = useNavigation()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async (e) => {
    await auth.register(email, password, username)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>

      {/* Username Input */}
      <View style={styles.inputContainer}>
      <FontAwesome5 name="user-alt" size={24} color="white" style={{paddingRight:15}} />
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          placeholderTextColor="#ccc"
          onChange={(e) => setUsername(e.nativeEvent.text)}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <FontAwesome5 name="envelope" size={24} color="white" style={{paddingRight:15}} />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#ccc"
          onChange={(e) => setEmail(e.nativeEvent.text)}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
      <FontAwesome5 name="lock" size={24} color="white" style={{paddingRight:15}} />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          placeholderTextColor="#ccc"
          onChange={(e) => setPassword(e.nativeEvent.text)}
        />
      </View>

      {/* Login Button */}
      <Pressable style={styles.loginButton} onPress={handleSignup}>
        <Text style={styles.loginButtonText}>Ingresar</Text>
      </Pressable>

      {/* Google Login Button */}
      <Pressable style={styles.googleButton}>
        <Text style={styles.googleButtonText}>Ingresar con Google</Text>
      </Pressable>

      {/* Register */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Ya tienes una cuenta? </Text>
        <Pressable 
          title='Iniciar sesión' 
          onPress={() => navigation.navigate('Login')}
          style={styles.registerText}>
          <Text style={styles.registerLink}>Iniciar sesión</Text>
        </Pressable>  
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A3A3A',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444',
    borderRadius: 30,
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#ccc',
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 10,
  },
  loginButton: {
    backgroundColor: '#a40990',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#fff',
    borderWidth: 2,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 70,
  },
  googleButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: '#fff',
  },
  registerLink: {
    color: '#a40990',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5
  },
});

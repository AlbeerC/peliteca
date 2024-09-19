import firestore from '@react-native-firebase/firestore'
import { useToast } from 'native-base' // Suponiendo que estás usando NativeBase para las notificaciones

// Función genérica para agregar una película a una lista
const addToList = async (userId, movie, listName) => {
  const toast = useToast() // Inicializa el toast para mostrar notificaciones
  try {
    const userRef = firestore().collection('users').doc(userId)
    const listRef = userRef.collection(listName)
    const prefixedId = `movie_${movie.id}`
    const movieRef = listRef.doc(prefixedId)

    const docSnapshot = await movieRef.get()
    if (docSnapshot.exists) {
      // Mostrar notificación si la película ya está en la lista
      toast.show({
        title: 'Esta película ya está en la lista',
        status: 'error',
        duration: 2000,
        isClosable: true,
        placement: 'top',
      })
      return
    }

    await movieRef.set({
      id: movie.id,
      posterPath: movie.posterPath,
      title: movie.title,
    })
    // Mostrar notificación si la película se agregó correctamente
    toast.show({
      title: 'Película agregada correctamente',
      status: 'success',
      duration: 2000,
      isClosable: true,
      placement: 'top',
    })
  } catch (error) {
    // Mostrar notificación si hubo un error
    toast.show({
      title: 'Error al agregar la película',
      description: error.message,
      status: 'error',
      duration: 2000,
      isClosable: true,
      placement: 'top',
    })
  }
}

// Funciones específicas que usan la función genérica
const addToWatchList = (userId, movie) => addToList(userId, movie, 'watchlist')
const addToWatched = (userId, movie) => addToList(userId, movie, 'watched')
const addToTop5 = (userId, movie) => addToList(userId, movie, 'top 5')

export { addToWatchList, addToWatched, addToTop5 }

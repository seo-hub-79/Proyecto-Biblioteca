import React, { useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Validación de email
  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  // Validación de contraseña (no vacía)
  const validatePassword = (password) => {
    return password.length > 0;
  };

  const handleLogin = async () => {
    // Validación antes de intentar el login
    if (!validateEmail(email)) {
      setError('Por favor, ingresa un email válido.');
      return;
    }
    if (!validatePassword(password)) {
      setError('La contraseña no puede estar vacía.');
      return;
    }

    setError(''); // Limpiar errores anteriores
    setIsLoading(true); // Mostrar el indicador de carga

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Library');
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
    } finally {
      setIsLoading(false); // Detener el indicador de carga
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        // Pantalla de carga
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Iniciando sesión...</Text>
        </View>
      ) : (
        // Formulario de inicio de sesión
        <>
          {/* Imagen en la parte superior */}
          <Text style={[styles.title, { fontSize: 24, fontWeight: 'bold' }]}>My Book Review</Text>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5606/5606108.png' }} 
            style={styles.image}
          />
          <Text style={[styles.title, { fontSize: 24, fontWeight: 'bold' }]}>Iniciar Sesión</Text>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            errorMessage={error && !validateEmail(email) ? 'Email inválido' : ''}
          />
          <Input
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            errorMessage={error && !validatePassword(password) ? 'Contraseña requerida' : ''}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Button
            title="Iniciar Sesión"
            onPress={handleLogin}
            containerStyle={styles.buttonI}
            disabled={isLoading} // Deshabilitar botón durante el login
          />
          <Button
            title="¿No tienes cuenta? Regístrate"
            type="clear"
            onPress={() => navigation.navigate('Register')}

          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(130, 224, 200)',
    padding: 20,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 200, // Ajusta el tamaño de la imagen según sea necesario
    resizeMode: 'center',
    marginBottom: 50, // Espacio entre la imagen y el título
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonI: {
    marginVertical: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});

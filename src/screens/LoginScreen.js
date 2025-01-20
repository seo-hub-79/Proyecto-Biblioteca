import React, { useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
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
      navigation.replace('Home');
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
          <Text style={[styles.title, { fontSize: 24, fontWeight: 'bold' }]}>Mi Comida Favorita</Text>
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
            containerStyle={styles.button}
            disabled={isLoading} // Deshabilitar botón durante el login
          />
          <Button
            title="Registrarse"
            type="outline"
            onPress={() => navigation.navigate('Register')}
            containerStyle={styles.button}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
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

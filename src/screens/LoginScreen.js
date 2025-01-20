import React, { useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // Estado de carga

  const handleLogin = async () => {
    setIsLoading(true);  // Iniciar la carga
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Home');
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
    } finally {
      setIsLoading(false);  // Detener la carga
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: 24, fontWeight: 'bold' }]}>Mi Comida Favorita</Text>
      
      {/* Mostrar el mensaje de error si existe */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Formulario de Login */}
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Si está cargando, mostrar el indicador de carga */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title="Iniciar Sesión"
          onPress={handleLogin}
          containerStyle={styles.button}
          disabled={isLoading}  // Deshabilitar el botón durante la carga
        />
      )}

      <Button
        title="Registrarse"
        type="outline"
        onPress={() => navigation.navigate('Register')}
        containerStyle={styles.button}
      />
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
});

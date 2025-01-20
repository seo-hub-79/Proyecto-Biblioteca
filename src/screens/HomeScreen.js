import React, { useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Validación de email
  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  // Validación de contraseña con más caracteres especiales permitidos
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,?])[A-Za-z\d!@#$%^&*.,?]{8,}$/;
    return passwordRegex.test(password);
  };

  // Validación de la coincidencia de contraseñas
  const validatePasswordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const handleRegister = async () => {
    // Validación antes de registrar
    if (!validateEmail(email)) {
      setError('Por favor, ingresa un email válido.');
      return;
    }
    if (!validatePassword(password)) {
      setError('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
      return;
    }
    if (!validatePasswordsMatch(password, confirmPassword)) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setError(''); // Limpiar errores anteriores
    setIsLoading(true); // Mostrar el indicador de carga

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.replace('Home');
    } catch (error) {
      setError('Error al registrarse: ' + error.message);
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
          <Text style={styles.loadingText}>Registrando usuario...</Text>
        </View>
      ) : (
        // Formulario de registro
        <>
          <Text style={[styles.title, { fontSize: 24, fontWeight: 'bold' }]}>Registro</Text>
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
            errorMessage={error && !validatePassword(password) ? 'Contraseña no válida' : ''}
          />
          <Input
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            errorMessage={error && !validatePasswordsMatch(password, confirmPassword) ? 'Las contraseñas no coinciden' : ''}
          />
          {error ? (
            <Text style={styles.error}>{error}</Text>
          ) : null}
          <Button
            title="Registrarse"
            onPress={handleRegister}
            containerStyle={styles.button}
            disabled={isLoading} // Deshabilitar el botón durante el registro
          />
          <Button
            title="Volver al Login"
            type="outline"
            onPress={() => navigation.navigate('Login')}
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

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function HomeScreen({ navigation }) {
  const [profile, setProfile] = useState({
    nombre: '',
    apellido: '',
    comidaFavorita: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const docRef = doc(db, 'usuarios', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    } catch (error) {
      console.error('Error al cargar perfil:', error);
    }
  };

  // Función para validar que solo contenga letras
  const validateText = (text) => {
    const regex = /^[A-Za-z\s]*$/;  // Solo letras y espacios
    return regex.test(text);
  };

  const handleUpdate = async () => {
    // Validar que los campos no estén vacíos y solo contengan letras
    if (!validateText(profile.nombre)) {
      setError('El nombre solo puede contener letras');
      return;
    }
    if (!validateText(profile.apellido)) {
      setError('El apellido solo puede contener letras');
      return;
    }
    if (!validateText(profile.comidaFavorita)) {
      setError('La comida favorita solo puede contener letras');
      return;
    }

    try {
      await setDoc(doc(db, 'usuarios', auth.currentUser.uid), profile);
      alert('Perfil actualizado exitosamente');
      setError('');  // Limpiar el error
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      alert('Error al actualizar perfil');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: 22, fontWeight: 'bold' }]}>Mi Perfil</Text>
      
      {/* Mostrar mensajes de error si los campos no son válidos */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Input
        placeholder="Nombre"
        value={profile.nombre}
        onChangeText={(text) => setProfile({ ...profile, nombre: text })}
      />
      <Input
        placeholder="Apellido"
        value={profile.apellido}
        onChangeText={(text) => setProfile({ ...profile, apellido: text })}
      />
      <Input
        placeholder="Comida Favorita"
        value={profile.comidaFavorita}
        onChangeText={(text) => setProfile({ ...profile, comidaFavorita: text })}
      />
      
      <Button
        title="Actualizar Perfil"
        onPress={handleUpdate}
        containerStyle={styles.button}
      />
      
      <Button
        title="Cerrar Sesión"
        type="outline"
        onPress={handleSignOut}
        containerStyle={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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

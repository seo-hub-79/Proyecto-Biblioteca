import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TextInput, StyleSheet, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { MaterialIcons } from '@expo/vector-icons'; // Para los íconos

export default function RegisterScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState(null); // Libro seleccionado para mostrar en el modal
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar el modal

  // API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://reactnd-books-api.udacity.com/books', {
          headers: { Authorization: 'whatever-you-want' },
        });
        const data = await response.json();
        setBooks(data.books);
        setFilteredBooks(data.books); // lista todos los libros
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Handle search input changes
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredBooks(books); // Si el campo de búsqueda está vacío, muestra todos los libros
    } else {
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };

  const handleBookPress = (book) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  // Cerrar modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedBook(null);
  };

  // Manejar cierre de sesión
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Renderizar cada libro en el listado
  const renderBookItem = ({ item }) => (
    <TouchableOpacity style={styles.bookItem} onPress={() => handleBookPress(item)}>
      <Image source={{ uri: item.imageLinks.thumbnail }} style={styles.bookImage} />
      <View>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.authors?.[0] || 'Autor desconocido'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Input de búsqueda */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar libros..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#6200EE" />
      ) : (
        <FlatList
          data={filteredBooks}
          keyExtractor={(item) => item.id}
          renderItem={renderBookItem}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Botón flotante de cerrar sesión */}
      <TouchableOpacity style={styles.floatingButton} onPress={handleSignOut}>
        <MaterialIcons name="logout" size={24} color="#FFF" />
      </TouchableOpacity>

      {/* Modal de detalles */}
      {selectedBook && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Botón de cerrar en la parte superior derecha */}
              <TouchableOpacity style={styles.closeIcon} onPress={closeModal}>
                <MaterialIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
              <Image
                source={{ uri: selectedBook.imageLinks.thumbnail }}
                style={styles.modalImage}
              />
              <View style={styles.modalDetails}>
                <Text style={styles.modalTitle}>{selectedBook.title}</Text>
                <Text style={styles.modalAuthor}>
                  Autor: {selectedBook.authors ? selectedBook.authors.join(', ') : 'Desconocido'}
                </Text>
                <Text style={styles.modalDescription}>
                  {selectedBook.description
                    ? `${selectedBook.description.substring(0, 100)}...`
                    : 'No hay descripción disponible.'}
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: 'rgb(130, 224, 200)',
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  listContent: {
    paddingBottom: 20,
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#2e86c1',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  bookImage: {
    width: 50,
    height: 75,
    marginRight: 15,
    borderRadius: 4,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#d1e8ff',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6200EE',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
  },
  modalImage: {
    width: 100,
    height: 150,
    marginRight: 15,
    borderRadius: 5,
  },
  modalDetails: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalAuthor: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

# My book review
# Requisitos:
las siguientes herramientas instaladas:

    Node.js (versión 14 o superior)
    npm o yarn
    Expo CLI
    Un emulador de Android/iOS o un dispositivo físico
    Cuenta activa en Firebase Console
Instalación y configuración
1. clonar el repositorio 
-  git clone https://github.com/seo-hub-79/Proyecto-Biblioteca.git
2. Instalar dependencias

-  npm install

-  npm install @react-navigation/native @react-navigation/native-stack

-  npm install firebase

-  npm install react-native-elements

-  npm install expo-constants

-  npm install react-native-safe-area-contex

3. Configurar Firebase

    Ir a Firebase Console ( https://console.firebase.google.com/)
    Crear nuevo proyecto "MiComidaFavorita"
    Habilitar Authentication (Email/Password)
    Crear Cloud Firestore
    Registrar la aplicación web
    Copiar configuración de Firebase

3. Iniciar el proyecto

- npx expo start
4. estructura del proyecto
book-review
-src
  - config
    -firebase
  - screens
    - LibraryScreen
    - LoginScreen
    - MyBooksScreen
    - RegisterScreen
  - navigation
    - AppNavigator
- App.js
- package.json
5. API
- Endpoint Base: https://reactnd-books-api.udacity.com
- Endpoints Disponibles: - GET /books: Lista todos los libros - GET /books/{id}: Obtiene un libro específico - POST /search: Busca libros - PUT /books/{id}: Actualiza estado de un libro
6. Funcionalidades
      - Registro de usuarios
      - inicio de sesion
      - campos validados tanto en el login como en el registro
      - la contrasenia debe ser de 8 caracteres 1 Mayuscula, una minuscula y un caracter especial

  - consumo de la API
      - se realizo el listado de los libros
      - se muestra la portada y el autor
      - al pulsar en un libro muestra detalles sobre el libro.
        
  - detalles del libro
    - al seleccinar un libro, este abre una ventana emergente con los detalles del libro, como ser:
      caratula, autor y una corta descripcion
    - cuenta con un boton de cerrar para ocultar la ventana
  - busqueda
    - se agrego un input el cual su funcion es de realizar la busqueda de libor acorde a lo que el usuario escriba
    - se realizara el filtro acorde a los caracteres que se escriban
  - cierre de sesion
    - en la parte baja del listado se encuentra un boton emergente el cual tiene por funcion cerrar la sesion del usuario 

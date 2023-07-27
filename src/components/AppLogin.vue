<template>
  <li>
    <button v-if="!isLoggedIn" class="btn btn-primary" @click="loginGoogle">
      Login with Google
    </button>
    <div v-else ref="welcomeContainer">
      <button class="btn btn-welcome" @click="showProfileOptions">
        <span>Bienvenido, {{ displayName }}!</span>
        <img :src="profileImage" alt="Perfil" class="profile-image" />
      </button>
      <div v-if="showOptions" ref="optionsContainer" class="options-container">
        <button class="btn btn-secondary" @click="openImageModal">
          Cambiar imagen de perfil
        </button>
        <button class="btn btn-danger" @click="logout">Cerrar sesión</button>
      </div>
    </div>

    <!-- Ventana emergente para cambiar la imagen de perfil -->
    <div v-if="showImageModal" class="modal-container">
      <div class="modal-content">
        <div class="modal-content-inner">
          <h2>Selecciona una imagen de perfil:</h2>
          <div class="image-list">
            <!-- Mostrar todas las imágenes disponibles -->
            <img
              v-for="image in imageList"
              :key="image"
              :src="require(`@/assets/${image}`)"
              :alt="image"
              class="modal-image"
              @click="selectImage(image)"
            />
          </div>
          <div class="modal-buttons">
            <button class="btn btn-danger" @click="closeImageModal">
              Cancelar
            </button>
            <button class="btn btn-primary" @click="saveImage">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAuth,
} from "firebase/auth";
import axios from "axios";

export default {
  data() {
    return {
      isLoggedIn: false,
      displayName: "",
      email: "",
      showOptions: false,
      showImageModal: false,
      profileImage: require("@/assets/perfil_1.jpg"), // Imagen por defecto
      imageList: [], // Lista de imágenes disponibles
      selectedImage: null,
    };
  },
  methods: {
    selectImage(image) {
      // Al hacer clic en una imagen, se selecciona
      this.selectedImage = image;
    },
    saveImage() {
      // Guardar la imagen seleccionada como nueva imagen de perfil
      if (this.selectedImage) {
        this.profileImage = require(`@/assets/${this.selectedImage}`);
      }
      // Cerrar la ventana emergente
      this.showImageModal = false;
    },
    openImageModal() {
      // Mostrar la ventana emergente
      this.showImageModal = true;

      // Obtener la lista de imágenes disponibles
      this.getImageList();
    },
    closeImageModal() {
      // Cerrar la ventana emergente
      this.showImageModal = false;
    },
    getImageList() {
      // Simulamos la obtención de la lista de imágenes disponibles
      // Aquí puedes usar axios u otras formas de obtener la lista desde tu servidor
      this.imageList = [
        "perfil_1.jpg",
        "perfil_2.jpg",
        "perfil_3.jpg",
        // Agrega el resto de las imágenes disponibles en el directorio D:\proyecto_anime\animeweb\src\assets\
      ];
    },
    async loginGoogle() {
      const googleProvider = new GoogleAuthProvider();
      const auth = getAuth();
      try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log("Resultado de inicio de sesión:", result);
        this.isLoggedIn = true;
        this.displayName = result.user.displayName;
        this.email = result.user.email;

        const response = await axios.post("http://localhost:3000/register", {
          displayName: this.displayName,
          email: this.email,
        });

        console.log("Respuesta del servidor:", response.data);

        alert("Inició sesión exitosamente");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.log("Error al iniciar sesión:", error.response.data.error);
          alert(error.response.data.error);
        } else {
          console.error("Error al iniciar sesión:", error);
          alert("Error al iniciar sesión");
        }
      }
    },
    changeProfileImage() {
      // Aquí puedes agregar la lógica para cambiar la imagen de perfil
      alert("Funcionalidad en desarrollo: Cambiar imagen de perfil");
    },
    showProfileOptions() {
      this.showOptions = !this.showOptions;
    },
    handleClickOutside(event) {
      // Verificar si los contenedores están definidos antes de usar el método contains
      const welcomeContainer = this.$refs.welcomeContainer;
      const optionsContainer = this.$refs.optionsContainer;

      if (
        welcomeContainer &&
        !welcomeContainer.contains(event.target) &&
        optionsContainer &&
        !optionsContainer.contains(event.target)
      ) {
        this.showOptions = false;
      }
    },
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.isLoggedIn = false;
          this.displayName = "";
          this.email = "";
          this.showOptions = false;
          alert("Se cerró sesión correctamente");
        })
        .catch((error) => {
          console.error("Error al cerrar sesión:", error);
          alert("Error al cerrar sesión");
        });
    },
  },

  mounted() {
    // Agregar el manejador de eventos para ocultar las opciones al hacer clic en otro lugar de la página
    document.addEventListener("click", this.handleClickOutside);
  },

  beforeUnmount() {
    // Eliminar el manejador de eventos antes de desmontar el componente
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style>
/* Estilos adicionales para el botón personalizado */
.btn-welcome {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.btn-welcome img {
  width: 40px;
  height: 40px;
  margin-left: 8px;
  border-radius: 50%;
}

/* Estilos para el contenedor de las opciones */
.options-container {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px;
}

.options-container button {
  margin-right: 8px;
}

/* Estilos para la ventana emergente */
.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 20%;
  left: 20%;
  width: 60%;
  height: 60%;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 9999;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.modal-content {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.modal-content-inner {
  width: 94%;
  height: 94%;
  padding: 3%;
}

/* Estilos para las imágenes en la lista */
.modal-image {
  width: 200px;
  height: 200px;
  object-fit: cover; /* Para que las imágenes sean cuadradas y cubran todo el espacio */
  margin: 20px; /* Margen entre las imágenes */
  border-radius: 50%; /* Hace que las imágenes se vean circulares */
}
</style>

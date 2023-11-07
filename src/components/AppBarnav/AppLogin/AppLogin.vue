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
      <div class="modal-content" ref="modalContent">
        <h2>Selecciona una imagen de perfil:</h2>
        <div class="image-list">
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
      profileImage: null, // Ahora la imagen de perfil es null inicialmente
      imageList: [],
      selectedImage: null,
      firstClickIgnored: false,
    };
  },
  methods: {
    openImageModal() {
      this.showImageModal = true;
      this.firstClickIgnored = false; // Reiniciar para el próximo uso del modal
      this.getImageList();
    },
    closeImageModal() {
      console.log("Cerrando modal");
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
        this.isLoggedIn = true;
        this.displayName = result.user.displayName;
        this.email = result.user.email;

        // Cuando un usuario inicia sesión, recupera su imagen de perfil desde la base de datos
        const response = await axios.get(
          `http://localhost:3000/profileImage?email=${this.email}`
        );
        if (response.data && response.data.profileImage) {
          this.profileImage = require(`@/assets/${response.data.profileImage}`);
        } else {
          this.profileImage = require("@/assets/perfil_1.jpg");
        }

        alert("Inició sesión exitosamente");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.error);
        } else {
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
    handleClickOutsideModal(event) {
      // Ignorar el primer clic si el modal está abierto
      if (this.showImageModal && !this.firstClickIgnored) {
        this.firstClickIgnored = true;
        return;
      }

      const modalContent = this.$refs.modalContent;
      if (modalContent && !modalContent.contains(event.target)) {
        this.closeImageModal();
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
    selectImage(image) {
      // Al seleccionar una imagen, guardamos el nombre en selectedImage
      this.selectedImage = image;
    },
    async saveImage() {
      if (this.selectedImage) {
        // Establece la nueva imagen de perfil
        this.profileImage = require(`@/assets/${this.selectedImage}`);
        this.closeImageModal();

        // Actualiza la columna profile_image en la base de datos para el usuario actual
        const response = await axios.post(
          "http://localhost:3000/updateProfileImage",
          {
            email: this.email,
            profileImage: this.selectedImage,
          }
        );
        console.log("Respuesta del servidor:", response.data);
      } else {
        alert("Selecciona una imagen primero.");
      }
    },
  },

  mounted() {
    // Agregar el manejador de eventos para ocultar las opciones al hacer clic en otro lugar de la página
    document.addEventListener("click", this.handleClickOutside);
    // Agregar el manejador de eventos para cerrar la ventana emergente si se hace clic fuera de ella
    document.addEventListener("click", this.handleClickOutsideModal);
  },

  beforeUnmount() {
    // Eliminar los manejadores de eventos antes de desmontar el componente
    document.removeEventListener("click", this.handleClickOutside);
    document.removeEventListener("click", this.handleClickOutsideModal);
  },
};
</script>

<style src="./AppLogin.css" scoped></style>

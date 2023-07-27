<template>
  <li>
    <button v-if="!isLoggedIn" class="btn btn-primary" @click="loginGoogle">
      Login with Google
    </button>
    <div v-else ref="welcomeContainer">
      <button class="btn btn-welcome" @click="showProfileOptions">
        <span>Bienvenido, {{ displayName }}!</span>
        <img src="@/assets/perfil_1.jpg" alt="Perfil" class="profile-image" />
      </button>
      <div v-if="showOptions" ref="optionsContainer" class="options-container">
        <button class="btn btn-secondary" @click="changeProfileImage">
          Cambiar imagen de perfil
        </button>
        <button class="btn btn-danger" @click="logout">Cerrar sesión</button>
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
    };
  },
  methods: {
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
</style>

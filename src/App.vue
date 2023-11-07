<template>
  <div class="Barnav">
    <AppBarnav msg="Welcome to Your Vue.js App" />
    <button @click="getUsers">Mostrar Usuarios</button>
  </div>
  <MainComponent />
</template>

<script>
import AppBarnav from "./components/AppBarnav/AppBarnav.vue";
import MainComponent from "./components/MainComponent/MainComponent.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    AppBarnav,
    MainComponent,
  },
  methods: {
    async getUsers() {
      try {
        // Realizar la petición a la ruta 'http://localhost:3000/users' usando Axios
        const response = await axios.get("http://localhost:3000/users");
        const users = response.data;
        const userList = users.map((user) => user.user_name).join("\n");
        alert("Usuarios:\n" + userList);
      } catch (error) {
        alert("Error al obtener usuarios.");
      }
    },
  },
};
</script>

<style>
.Barnav {
  background-color: #1e1f22; /* Agregado: fondo oscuro */
}
</style>

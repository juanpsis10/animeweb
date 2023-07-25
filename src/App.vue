<template>
  <div>
    <AppBarnav msg="Welcome to Your Vue.js App" />
    <button @click="getUsers">Mostrar Usuarios</button>
  </div>
</template>

<script>
import AppBarnav from "./components/AppBarnav.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    AppBarnav,
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

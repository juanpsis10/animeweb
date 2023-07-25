<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container d-flex justify-content-center">
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link" href="#">Búsqueda</a></li>
      </ul>
    </div>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item"><a class="nav-link" href="#">Notificaciones</a></li>
      <li class="nav-item"><AppLogin /></li>
      <li class="nav-item Icono">
        <a class="nav-link" href="#"><i class="fas fa-user"></i> ICONO</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import AppLogin from "./AppLogin.vue";

export default {
  name: "AppBarnav",
  components: {
    AppLogin,
  },
};
</script>
<style>
.navbar {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navbar li {
  margin-right: 10px;
}
.navbar li a {
  color: #092292;
  text-decoration: none;
  padding: 10px;
}
.navbar li a:hover {
  background-color: #555;
}
.fa-user {
  margin-right: 5px;
}
</style>

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
    </ul>
  </nav>
</template>

<script>
import AppLogin from "./AppLogin/AppLogin.vue";

export default {
  name: "AppBarnav",
  components: {
    AppLogin,
  },
};
</script>
<style src="./AppBarnav.css" scoped></style>

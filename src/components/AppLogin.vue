<template>
  <li>
    <button class="btn btn-primary" @click="loginGoogle">
      Login with Google
    </button>
  </li>
</template>

<script>
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

export default {
  methods: {
    async loginGoogle() {
      const googleProvider = new GoogleAuthProvider();
      const auth = getAuth();
      try {
        const result = await signInWithPopup(auth, googleProvider);
        alert("Inició sesión exitosamente", result);
      } catch (error) {
        alert("Error al iniciar sesión", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>

<template>
  <div class="router-buttons">
    <RouterLink to="/login">
      <button v-if="$route.path === '/login'" class="sign-in-button active">
        Sign in
      </button>
      <button v-else class="sign-in-button">
        Sign in
      </button>
    </RouterLink>
    <RouterLink to="/registration">
      <button v-if="$route.path === '/registration'" class="sign-up-button active">
        Sign up
      </button>
      <button v-else class="sign-up-button">
        Sign up
      </button>
    </RouterLink>
  </div>
</template>
<script setup>
import { RouterLink } from "vue-router";
</script>
<style>
.router-buttons {
  margin-top: 33px;
}
.sign-in-button {
  padding: 12px;
  border: none;
  background-color: white;
  border-radius: 5px 0 0 5px;
}
.sign-up-button {
  padding: 12px;
  border: none;
  background-color: white;
  border-radius: 0 5px 5px 0;
}
.active {
  background-color: black;
  color: white;
}
</style>

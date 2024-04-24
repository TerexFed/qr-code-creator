<template>
  <h1>QR CODE GENERATOR</h1>
  <h2>Sign in</h2>
  <img src="../assets/main-image.svg" alt="" />

  <form @submit.prevent="login()">
    <input type="text" placeholder="Login" v-model="username" />
    <input type="text" placeholder="Password" v-model="password" />
    <button>Sign in!</button>
  </form>

  <router-button></router-button>
</template>
<script setup>
import routerButton from "@/components/router-button/router-button.vue";
import axios from "axios";

let username = "";
let password = "";

function login() {
  axios.post("http://localhost/3000/login", {
    username: username,
    password: password,
  });
}
</script>
<style scoped>
img {
  margin-top: 33px;
}
form {
  display: flex;
  flex-direction: column;
}
form > * {
  margin-top: 33px;
}
button {
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: white;

  color: var(--text-primary-color);
  font-family: JejuGothic;
  font-size: 16px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0px;
}
</style>

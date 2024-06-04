<template>
  <div class="login">
    <h1>QR CODE GENERATOR</h1>
    <h2>Sign in</h2>
    <img src="../assets/main-image.svg" alt="" />

    <form @submit.prevent="login()">
      <input type="text" placeholder="Login" v-model="username" />
      <input type="text" placeholder="Password" v-model="password" />
      <button>Sign in!</button>
      <label v-if="errorMsg !== ''">{{ errorMsg }}</label>
    </form>

    <router-button></router-button>
  </div>
</template>
<script setup>
import router from "@/router";
import routerButton from "@/components/router-button/router-button.vue";
import axios from "axios";
import { ref } from "vue";

let username = "";
let password = "";
let errorMsg = ref('');

function login() {
  axios
    .post(
      "https://qr-code-creator.onrender.com/login",
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-Powered-By": "Express",
        },
      }
    )
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem("token", token);
      if (token) {
        router.push('/qr-code-creator');
      } else {
        router.push('/login');
      }
    })
    .catch(error => {
      console.error("Login failed:", error);
      errorMsg.value = error.response.data.message
    });
}
</script>
<style scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
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
label {
  text-align: center;
  color: rgb(43, 0, 255);
}
</style>

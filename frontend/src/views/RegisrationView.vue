<template>
  <div class="registration">
    <h1>QR CODE GENERATOR</h1>
    <h2>Sign up</h2>
    <img src="../assets/main-image.svg" alt="" />

    <form @submit.prevent="registerAndLogin()">
      <input type="text" placeholder="Login" v-model="username" />
      <input type="text" placeholder="Password" v-model="password" />
      <button>Sign up!</button>
      <label v-if="errorMsg !== ''">{{ errorMsg }}</label>
    </form>

    <router-button></router-button>
  </div>
</template>
<script setup>
import routerButton from "@/components/router-button/router-button.vue";
import axios from "axios";
import { ref } from "vue";
import router from "@/router";

let username = "";
let password = "";
let errorMsg = ref('');
let response = ref('')

async function register() {
  await axios.post(
    "https://qr-code-creator.onrender.com/register",
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
    .then(res => {
      response.value = res.data.message
    })
    .catch(error => {
      console.error("Login failed:", error);
      errorMsg.value = error.response.data.message
    })
}
async function registerAndLogin() {
  await register()
  if (response.value === 'User registered successfully') {
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
      })
  }
}
</script>
<style scoped>
.registration {
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

form>* {
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

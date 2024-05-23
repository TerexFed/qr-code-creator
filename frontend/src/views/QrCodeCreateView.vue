<template>
  <div class="qr-code-creator">
    <div class="header">
      <div class="header-text">
        <div class="navigation">
          <RouterLink class="navigation-link" to="/qr-code-creator"
            >QR CODE GENERATOR</RouterLink
          >
          <div class="line"></div>
          <RouterLink class="navigation-link" to="/qr-code-created"
            >CREATED QR CODES</RouterLink
          >
        </div>
        <img src="../assets/main-image.svg" alt="top-qr-code" />
      </div>
      <RouterLink class="back-to-login" @click="logout()" to="/login"
        >Log out</RouterLink
      >
    </div>
    <div class="main">
      <div class="qr-code-show">
        <div class="qr-code-template">
          <img v-if="qrCode" :src="qrCode" alt="" title="" />
        </div>
        <div class="input-layout">
          <input
            :type="getInputType()"
            :placeholder="inputPlaceholder"
            v-model="inputVal"
          />
          <button @click="inputVal = ''" class="input-clear">Clear</button>
        </div>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <button class="button-create" @click="generateQRCode">
          Generate QR Code
        </button>
      </div>
      <div class="choise">
        <label>What do you want do paste in qr code?</label>
        <select v-model="select">
          <option selected value="email">Email</option>
          <option value="website link">Website link</option>
          <option value="telephone">Telephone</option>
          <option value="image">Image</option>
          <option value="text">Browser search</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";
import axios from "axios";

let select = ref("email");
let inputVal = ref("");
let errorMessage = ref("");

watch(select, (newValue) => {
  inputPlaceholder.value = `Type your ${newValue} here`;
  qrCode.value = "";
  errorMessage.value = "";
  inputVal.value = "";
});

const inputPlaceholder = ref(`Type your ${select.value} here`);
const qrCode = ref("");

function getInputType() {
  if (select.value === "email") {
    return "email";
  } else if (select.value === "telephone") {
    return "tel";
  } else {
    return "text";
  }
}

function validateInput() {
  if (inputVal.value.trim() === "") {
    errorMessage.value = "Input cannot be empty";
    return false;
  }
  if (select.value === "email") {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!pattern.test(inputVal.value)) {
      errorMessage.value = "Please enter a valid email address";
      return false;
    }
  } else if (select.value === "website link") {
    try {
      new URL(inputVal.value);
    } catch (_) {
      errorMessage.value = "Please enter a valid URL";
      return false;
    }
  } else if (select.value === "telephone") {
    // eslint-disable-next-line no-useless-escape
    const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!pattern.test(inputVal.value)) {
      errorMessage.value = "Please enter a valid telephone number";
      return false;
    }
  } else if (select.value === "image") {
    const pattern = /[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/;
    if (!pattern.test(inputVal.value)) {
      errorMessage.value = "Please enter a valid link for an image";
      return false;
    }
  }
  errorMessage.value = "";
  return true;
}

async function generateQRCode() {
  if (validateInput()) {
    const token = localStorage.getItem("token");
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${inputVal.value}&size=250x250`;
    qrCode.value = qrCodeUrl;

    try {
      await axios.post(
        "http://localhost:3000/qr-codes",
        {
          data: qrCodeUrl,
          title:
            inputVal.value.toLocaleLowerCase().endsWith("png") ||
            inputVal.value.toLocaleLowerCase().startsWith("jpeg")
              ? "Image"
              : inputVal.value.toLocaleLowerCase().endsWith("gif")
              ? "GIF"
              : inputVal.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Failed to save QR code:", error);
    }
  }
}

function logout() {
  localStorage.removeItem("token");
}
</script>
<style scoped>
h1 {
  margin: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  background-color: #c4c4c4;
  padding: 0 20px 0 20px;
}

.header-text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: fit-content;
}

.navigation {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.navigation-link {
  color: var(--text-primary-color);
  font-family: JejuGothic;
  font-size: 20px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
  text-decoration: none;
  text-align: center;
}

.line {
  width: auto;
  height: 1px;
  margin: 5px 0 5px 0;
  background-color: black;
}

img[alt="top-qr-code"] {
  opacity: 0.5;
  padding-left: 27px;
}

.back-to-login {
  color: var(--text-primary-color);
  font-family: JejuGothic;
  font-size: 20px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
  text-decoration: none;
}

.back-to-login:hover,
.navigation-link:hover {
  color: white;
  transition: 0.2s;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
}

.input-layout {
  display: flex;
  align-items: center;
}

.input-clear {
  cursor: pointer;
  height: 40px;
  background-color: white;
  border: none;
  border-radius: 0 5px 5px 0;
  padding: 10px;
  font-size: 16px;
  border-left: 1px solid black;
}

.input-clear:active {
  transition: 0.2s;
  transform: translate(-3px);
}

.choise {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

label {
  color: var(--text-primary-color);
  font-family: JejuGothic;
  font-size: 16px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0px;
  padding: 0 0 5px 15px;
}

.qr-code-show {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.qr-code-template {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  width: 280px;
  height: 280px;
  background-color: white;
  margin-bottom: 20px;
}

.error {
  color: rgb(43, 0, 255);
  margin-top: 10px;
}

.button-create {
  font-size: 20px;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
  box-shadow: 0px 10px 0px rgb(0, 0, 0);
}
.button-create:hover {
  transition: 0.4s;
  box-shadow: 0px 0px 0px transparent;
}

@media (max-width: 500px) {
  img[alt="top-qr-code"] {
    display: none;
  }
  a.back-to-login,
  a.navigation-link {
    font-size: 15px;
  }
  input,
  select {
    width: 80vw;
  }
  label {
    font-size: 14px;
  }
}
</style>

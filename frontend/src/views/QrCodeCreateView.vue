<template>
  <div class="qr-code-creator">
    <div class="header">
      <div class="header-text">
        <h1>QR CODE GENERATOR</h1>
        <img src="../assets/main-image.svg" alt="top-qr-code" />
      </div>
      <RouterLink class="back-to-login" @click="logout()" to="/login">Log out</RouterLink>
    </div>
    <div class="main">
      <div class="qr-code-show">
        <img :src="qrCode" alt="" title="" />
        <input 
          :type="getInputType()" 
          :accept="getInputType() === 'file' ? 'image/png, image/jpeg' : ''" 
          :placeholder="inputPlaceholder" 
          v-model="inputVal"
        />
      </div>
      <div class="choise">
        <label>What do you want do paste in qr code?</label>
        <select v-model="select">
          <option selected value="email">Email</option>
          <option value="website link">Website link</option>
          <option value="image">Image</option>
          <option value="text">Browser search</option>
          <option value="SMS">SMS</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";

let select = ref("email");
let inputVal = ref("")

watch(select, (newValue) => {
  inputPlaceholder.value = `Type your ${newValue} here`;
  qrCode.value = ''
});
watch(inputVal, (newValue) => {
  qrCode.value = `https://api.qrserver.com/v1/create-qr-code/?data=${newValue}&amp;size=100x100`;
});

const inputPlaceholder = ref(`Type your ${select.value} here`);
const qrCode = ref(`https://api.qrserver.com/v1/create-qr-code/?data=${inputVal.value}&amp;size=100x100`)

function getInputType(){
  if (select.value === 'email'){
    return 'email'
  }
  else if (select.value === 'image'){
    return 'file'
  }
  else {
    return 'text'
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
  margin-top: 33px;
  text-decoration: none;
}

.back-to-login:hover {
  color: white;
  transition: 0.2s;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}

input {
  font-size: 16px;
}

.choise {
  display: flex;
  flex-direction: column;
  margin-top: 70px;
}

label {
  color: var(--text-primary-color);
  font-family: JejuGothic;
  font-size: 16px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0px;
  padding: 0 0 5px 15px
}

.qr-code-show {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

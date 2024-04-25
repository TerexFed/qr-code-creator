<template>
  <div class="qr-code-creator">
    <div class="header">
      <div class="header-text">
        <h1>QR CODE GENERATOR</h1>
        <img src="../assets/main-image.svg" alt="" />
      </div>
      <RouterLink class="back-to-login" to="/login">Log out</RouterLink>
    </div>
    <div class="main">
      <input type="text" placeholder="Type your email here" />

      <div class="choise">
        <label>What do you want do paste in qr code?</label>
        <select>
          <option value="">Email</option>
          <option value="">Website link</option>
          <option value="">Image</option>
          <option value="">Text</option>
          <option value="">SMS</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script setup>
import { RouterLink } from "vue-router";
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
img {
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
</style>

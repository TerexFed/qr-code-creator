<template>
    <h1>QR CODE GENERATOR</h1>
    <h2>Sign up</h2>
    <img src="../assets/main-image.svg" alt="" />
  
    <form>
      <input type="text" placeholder="Login" />
      <input type="text" placeholder="Password" />
      <button>Sign up!</button>
    </form>
  </template>
  <script setup></script>
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
  
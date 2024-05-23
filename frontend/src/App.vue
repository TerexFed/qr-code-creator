<template>
  <router-view></router-view>
</template>
<script setup></script>
<style>
:root {
  --text-primary-color: rgb(0, 0, 0);
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: rgb(194, 190, 190);
}
#app {
  height: 100vh;
}
h1 {
  color: var(--text-primary-color);
  font-family: JejuGothic;
  font-size: 24px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0px;
  margin-top: 120px;
}
h2 {
  color: var(--text-primary-color);
  font-family: JejuGothic;
  font-size: 20px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
  margin-top: 33px;
}
input {
  width: 350px;
  height: 40px;
  border: none;
  font-size: 16px;
  border-radius: 5px 0 0 5px;
  outline: none;
  padding-left: 15px;
}
select {
  width: 350px;
  height: 40px;
  border: none;
  border-radius: 5px;
  outline: none;
  padding-left: 15px;
  font-size: 18px;
}
select::after{
  content: '';
  background: url('./assets/select-arrow.svg');
}
</style>

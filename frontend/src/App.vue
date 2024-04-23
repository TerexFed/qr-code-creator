<template>
  <router-view></router-view>
</template>
<script setup></script>
<style>
:root{
  --text-primary-color: rgb(0, 0, 0);
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
body {
  background: rgb(194, 190, 190);
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
input{
  width: 20vw;
  height: 40px;
  border: none;
  border-radius: 5px;
  outline: none;
  padding-left: 15px;
}
</style>

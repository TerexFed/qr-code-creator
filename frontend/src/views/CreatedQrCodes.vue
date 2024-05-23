<template>
  <div>
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
    <div class="qr-codes">
      <div class="no-qr-codes" v-if="qrCodes.length === 0"><h1>No QR Codes created yet</h1></div>
      <div class="created-qr-codes" v-else>
        <div v-for="qrCode in qrCodes" :key="qrCode._id" class="qr-code-item">
          <img :src="qrCode.data" alt="QR-Code" />
          <p class="qr-code-text">{{ qrCode.title }}</p>
          <button @click="deleteQrCode(qrCode._id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const qrCodes = ref([]);

onMounted(async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get('http://localhost:3000/qr-codes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    qrCodes.value = response.data;
  } catch (error) {
    console.error('Failed to fetch QR codes:', error);
  }
});

async function deleteQrCode(qrCodeId) {
  const token = localStorage.getItem('token'); 

  try {
    const response = await axios.delete(`http://localhost:3000/qr-codes/${qrCodeId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('QR Code deleted successfully:', response.data);
    qrCodes.value = qrCodes.value.filter(qrCode => qrCode._id !== qrCodeId);
  } catch (error) {
    console.error('Error deleting QR code:', error.response ? error.response.data : error.message);
  }
}
</script>
<style>
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

.created-qr-codes{
  display: grid; 
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  margin-top: 25px;
}

.no-qr-codes{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr-code-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  margin: 5px;
  padding: 10px;
  width: 300px;
  height: fit-content;
}
.qr-code-item img {
  width: 250px;
  height: 250px;
  border: 2px solid black;
}
.qr-code-text{
  font-size: 20px;
  width: 250px;
  margin: 10px 10px;
  word-wrap: break-word;
  text-align: center;
}
.qr-code-item button{
  cursor: pointer;
  background-color: red;
  font-size: 15px;
  border: none;
  padding: 10px;
  border-radius: 5px;
}
.qr-code-item button:hover{
  transition: 0.2s;
  color: white;
}

@media (max-width: 1320px) {
  .created-qr-codes{
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 980px) {
  .created-qr-codes{
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 676px) {
  .created-qr-codes{
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (max-width: 500px) {
  img[alt="top-qr-code"] {
    display: none;
  }
  a.back-to-login,
  a.navigation-link {
    font-size: 15px;
  }
}
</style>


<template>
  <Header/>
      <RegisterForm/>
    <Footer/>
</template>
    
<script lang="ts" setup>
definePageMeta({
  name: 'regpage',
})
import Footer from '~/components/Footer.vue';
import Header from '~/components/Header.vue';
import RegisterForm from '~/components/RegisterForm.vue';
    
    
  
</script>

  
  <style scoped>
  .container {
    max-width: 400px;
  }
  </style>
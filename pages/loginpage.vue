<template>
    <Header/>
      <LoginForm/>
     <Footer/>
</template>
    
<script lang="ts" setup>
definePageMeta({
  name: 'loginpage',
})
import Footer from '~/components/Footer.vue';
import Header from '~/components/Header.vue';
import LoginForm from '~/components/LoginForm.vue';

    
    
  
</script>
    
<style scoped>
  
</style>
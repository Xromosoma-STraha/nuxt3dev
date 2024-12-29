<script setup lang="ts">
import UserProfile from '~/components/UserProfile.vue';



  definePageMeta({
  layout: 'custom',
  middleware:'auth'

})
</script>

<template>
  <div>
    <UserProfile/>
  </div>
</template>

<style >

</style>
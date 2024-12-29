<template>
    <div>
      <AddTrainingForm/>
    </div>
  </template>
  
<script setup lang="ts">
import AddTrainingForm from '~/components/AddTrainingForm.vue';
    definePageMeta({
    layout: 'custom',
    middleware:'auth'
  })
</script>
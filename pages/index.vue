<script setup lang="ts">
import TrainingMap from '~/components/TrainingMap.vue';



definePageMeta({
  layout: 'custom',
  middleware:'auth'

})  
</script>

<template>
  <div>
    <TrainingMap/>
  </div>
</template>

<style >

</style>
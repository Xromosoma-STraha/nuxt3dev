<template>
    <div class="training-card rounded-full bg-gray-200 p-4 cursor-pointer" @click="showDetails">
      <p class="text-center font-bold">{{ trainingPlan.name }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { TrainingPlan } from '~/types/models'
  
  const props = defineProps<{
    trainingPlan: TrainingPlan
  }>()
  
  const emit = defineEmits<{
    (e: 'show-details', trainingPlan: TrainingPlan): void
  }>()
  
  // Делаем trainingPlan доступным через defineExpose
  defineExpose({ trainingPlan: props.trainingPlan });
  
  
  const showDetails = () => {
    // используй props.trainingPlan
    emit('show-details', props.trainingPlan)
  }
  </script>
  
  <style scoped>
  .training-card {
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;  
  }
  /* Добавьте стили для :hover эффекта */
</style>
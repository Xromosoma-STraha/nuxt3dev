<template>
    <div v-if="trainingPlan" class="training-details p-4 border rounded shadow">
      <h3>{{ trainingPlan.name }}</h3>
      <p v-if="trainingPlan.description">{{ trainingPlan.description }}</p>
      <table>
        <thead>
          <tr>
            <th>Упражнение</th>
            <th>Подходы</th>
            <th>Повторения</th>
            <th>Вес (кг)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="exercise in trainingPlan.exercises" :key="exercise.id">
            <td>{{ exercise.name }}</td>
            <td>{{ exercise.sets }}</td>
            <td>{{ exercise.reps }}</td>
            <td>{{ exercise.weight ? exercise.weight : '-' }}</td> 
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { TrainingPlan } from '~/types/models'
  
  defineProps<{
    trainingPlan: TrainingPlan | null
  }>()
  
  
  </script>
  
  <style scoped>
  .training-details{
      margin-top: 20px;
  }
  </style>
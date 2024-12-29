<template>
  <div v-if="trainingPlan" class="training-details p-4 border rounded shadow">
    <h3>{{ trainingPlan.name }}</h3>
     <p v-if="trainingPlan.date">Дата тренировки: {{formattedDate}}</p>
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
        <tr v-for="exercise in trainingPlan.trainingPlanExercises" :key="exercise.id">
          <td>{{ exercise.exercise.name }}</td>
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
import { useDateFormat } from '@vueuse/core';

const props = defineProps<{
  trainingPlan: TrainingPlan | null
}>()
const formattedDate = computed(() => {
 if(props.trainingPlan && props.trainingPlan.date){
    return useDateFormat(props.trainingPlan.date, 'YYYY-MM-DD').value
 }
  return null
})


</script>

<style scoped>
.training-details{
    margin-top: 20px;
}
</style>
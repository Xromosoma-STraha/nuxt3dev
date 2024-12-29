<template>
  <div>
      <h2  class="text-center">Добавление тренировки</h2>
      <form @submit.prevent="addTrainingPlan">
          <div>
              <label for="name">Название:</label>
              <input type="text" id="name" v-model="trainingPlan.name" required class="text-black" />          
              <label for="description">Описание:</label>
               <input id="description" v-model="trainingPlan.description" class="text-black">
          </div>
           <div>
            <label for="date">Дата тренировки</label>
            <input type="date" id="date" v-model="trainingPlan.date" class="text-black">
          </div>
          <div v-for="(exercise, index) in trainingPlan.exercises" :key="index">
             <label for="exercise">Упражнение</label>
             <select id="exercise" v-model.number="exercise.id" required class="text-black">
                  <option v-for="item in availableExercises" :key="item.id" :value="item.id">{{item.name}}</option>
             </select>
            
             <label for="sets">Подходы</label>
             <input type="number" id="sets" v-model.number="exercise.sets" required min="1" class="text-black"/>

             <label for="reps">Повторения</label>
             <input type="number" id="reps" v-model.number="exercise.reps" required min="1" class="text-black" />
               <label for="weight">Вес(кг)</label>
              <input type="number" id="weight"  v-model="exercise.weight" class="text-black"/>
             <button type="button" @click="removeExercise(index)" class="border rounded py-2 px-4 hover:bg-gray-200 transition-colors">Удалить</button>
         </div>
         <button type="button" @click="addExercise" class="border rounded py-2 px-4 hover:bg-gray-200 transition-colors">Добавить упражнение</button>
        <button type="submit" class="border rounded py-2 px-4 hover:bg-gray-200 transition-colors">Добавить тренировку</button>
        <div v-if="errorMessage" style="color: red">{{ errorMessage }}</div>
      </form>
  </div>
  
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useDateFormat } from '@vueuse/core';
import { jwtDecode } from 'jwt-decode';

const authStore = useAuthStore();
const trainingPlan = reactive({
name: '',
description: '',
date: null,
exercises: [{ id: null, sets: 0, reps: 0, weight: null }],
});

const availableExercises = ref([

]);
const errorMessage = ref(null)
const addExercise = () => {
  trainingPlan.exercises.push({ id: null, sets: 0, reps: 0, weight:null });
};

const removeExercise = (index) => {
  trainingPlan.exercises.splice(index, 1);
};
onMounted(async () => {
try{
      const response = await $fetch('/api/exercises', {
      method: 'GET',
      });
    availableExercises.value = response
} catch (e){
  console.error("не удалось получить упражнения")
}
})
const addTrainingPlan = async () => {
try {
  const formattedDate = trainingPlan.date ? useDateFormat(trainingPlan.date, 'YYYY-MM-DD').value : useDateFormat(new Date(), 'YYYY-MM-DD').value

  const response = await $fetch('/api/trainingPlans', {
    method: 'POST',
    body: {
      ...trainingPlan,
      date: formattedDate,
      userId: authStore.userId,
    },
  });
  if (response.ok) {
    trainingPlan.name = '';
    trainingPlan.description = '';
    trainingPlan.date = null;
    trainingPlan.exercises = [{ id: null, sets: 0, reps: 0, weight: null }];
    errorMessage.value = null;
    console.log('Тренировочный план добавлен успешно!');
    navigateTo('/');
  } else {
    errorMessage.value = 'Ошибка при добавлении тренировочного плана';
    console.error('Ошибка при добавлении тренировочного плана:', response);
  }
} catch (e) {
  errorMessage.value = 'Ошибка при добавлении тренировочного плана';
  console.error('Ошибка при добавлении тренировочного плана:', e);
}
};
</script>
<style scoped>
input.text-black,textarea.text-black,select.text-black {
  color: black;
}
</style>
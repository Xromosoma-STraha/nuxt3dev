<template>
  <div>
    <h2>Добавить тренировочный план</h2>
    <form @submit.prevent="addTrainingPlan">
      <div>
        <label for="name">Название:</label>
        <input type="text" id="name" v-model="trainingPlan.name" required />
      </div>
      <div>
        <label for="description">Описание:</label>
        <textarea id="description" v-model="trainingPlan.description"></textarea>
      </div>

      <div>
        <label for="date">Дата тренировки</label>
        <input type="date" id="date" v-model="trainingPlan.date" />
      </div>
      <div v-for="(exercise, index) in trainingPlan.exercises" :key="index">
        <label for="exercise">Упражнение</label>
        <select id="exercise" v-model.number="exercise.id" required>
          <option v-for="item in availableExercises" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>

        <label for="sets">Подходы</label>
        <input type="number" id="sets" v-model.number="exercise.sets" required min="1" />

        <label for="reps">Повторения</label>
        <input type="number" id="reps" v-model.number="exercise.reps" required min="1" />
         <label for="weight">Вес(кг)</label>
        <input type="number" id="weight" v-model="exercise.weight"/>
        <button type="button" @click="removeExercise(index)">Удалить</button>
      </div>
      <button type="button" @click="addExercise">Добавить упражнение</button>
      <button type="submit">Добавить</button>
      <div v-if="errorMessage" style="color: red">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useDateFormat } from '@vueuse/core';


const authStore = useAuthStore();
const trainingPlan = reactive({
  name: '',
  description: '',
  date: null,
  exercises: [{ id: null, sets: 0, reps: 0, weight:null }],
});

const availableExercises = ref([
  
]);
const errorMessage = ref(null);

const addExercise = () => {
  trainingPlan.exercises.push({ id: null, sets: 0, reps: 0 , weight:null});
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
    const formattedDate = trainingPlan.date
      ? useDateFormat(trainingPlan.date, 'YYYY-MM-DD').value
      : useDateFormat(new Date(), 'YYYY-MM-DD').value;

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
      trainingPlan.exercises = [{id: null, sets: 0, reps: 0, weight: null}];
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
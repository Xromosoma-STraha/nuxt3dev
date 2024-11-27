<template>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="userName" class="block text-gray-700 font-bold mb-2">Username</label>
        <input type="text" id="userName" v-model="userName" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        <p class="text-red-500 text-xs italic" v-if="errors.userName">{{ errors.userName }}</p>
      </div>
      <div class="mb-6">
        <label for="password" class="block text-gray-700 font-bold mb-2">Password</label>
        <input type="password" id="password" v-model="password" class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
        <p class="text-red-500 text-xs italic" v-if="errors.password">{{ errors.password }}</p>
      </div>
      <div class="flex items-center justify-between">
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="isSubmitting">
          {{ isSubmitting ? "Submitting..." : "Sign In" }}
        </button>
      </div>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';

  import { navigateTo } from '#app'
  
  const userName = ref('');
  const password = ref('');
  const errors = ref({} as { userName?: string, password?: string });
  const isSubmitting = ref(false);

  import { useAuthStore } from '~/stores/auth'

  const authStore = useAuthStore()

  
  async function submitForm() {
    errors.value = {}; // Очищаем ошибки перед валидацией
  
      // Валидация на пустые поля
    if (!userName.value) errors.value.userName = "Username is required";
    if (!password.value) errors.value.password = "Password is required";
  
      // Если есть ошибки валидации, не отправляем запрос
    if (Object.keys(errors.value).length > 0) return;
  

    isSubmitting.value = true;
    try {
      const data = await $fetch('/api/login', {
        method: 'POST',
        body: {
          userName: userName.value,
          password: password.value,         
        },
      });
      console.log(data)
      if (data?.userId) {
        
        authStore.login(data.token);
        console.log("Перед navigateTo('/')");
        await navigateTo('/'); // <-- await здесь важен!
        console.log("После navigateTo('/')"); // Эта строка не должна выполниться
      } else {
              // Обрабатываем как ошибку - нет userId в ответе
        console.error("Unexpected server response:", data);
        alert("Login failed. Unexpected server response.");
      }
    } catch (error: any) {
      console.error('Login error', error);
          // Обрабатываем ошибку - выводим alert
      const errorMessage = error?.response?.data?.message || error.message || "Login failed"; // уточненный доступ к сообщению об ошибке
          alert(errorMessage);
    } finally {
      isSubmitting.value = false;
    }
  }
  </script>
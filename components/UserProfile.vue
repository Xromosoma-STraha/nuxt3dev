<template>
    <div>
      <h2>Редактировать профиль</h2>
      <form @submit.prevent="updateProfile">
        <div>
          <label for="firstName">Имя:</label>
          <input type="text" id="firstName" v-model="firstName" required />
        </div>
        <div>
          <label for="lastName">Фамилия:</label>
          <input type="text" id="lastName" v-model="lastName" required />
        </div>
        <div>
          <label for="newPassword">Новый пароль:</label>
          <input type="password" id="newPassword" v-model="newPassword" />
        </div>
           <div v-if="errorMessage" style="color: red">{{ errorMessage }}</div>
        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Сохраняем...' : 'Сохранить' }}
        </button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useAuthStore } from '~/stores/auth';
  import { navigateTo } from '#app';
  const authStore = useAuthStore()
  const firstName = ref('');
  const lastName = ref('');
  const newPassword = ref('');
  const isSubmitting = ref(false);
  const errorMessage = ref<string | null>(null)
  
  async function updateProfile() {
    isSubmitting.value = true;
      errorMessage.value = null
    try {
      const response = await $fetch('/api/users/update', {
        method: 'POST',
        body: {
          firstName: firstName.value,
          lastName: lastName.value,
          newPassword: newPassword.value,
          userId:authStore.userId,
        },
      });
      if (response?.ok) {
        console.log('Профиль обновлен успешно!');
       
       navigateTo('/')
      }
      else {
          errorMessage.value = 'Ошибка при обновлении профиля'
          console.error('Ошибка при обновлении профиля:', response);
      }
    } catch (error: any) {
        errorMessage.value = 'Ошибка при обновлении профиля'
      console.error('Ошибка при обновлении профиля:', error);
    } finally {
      isSubmitting.value = false;
    }
  }
  </script>
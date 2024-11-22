<template>
  <Header/>
    <div class="container mx-auto max-w-md p-4">
      <h1 class="text-2xl font-bold text-center">Авторизация</h1>
      <form @submit.prevent="login" class="my-4">
        <input
          type="text"
          v-model="loginForm.username"
          placeholder="Логин"
          class="block w-full p-2 my-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          v-model="loginForm.password"
          placeholder="Пароль"
          class="block w-full p-2 my-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          class="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600">
          Войти
        </button>
      </form>
      <p class="text-center">
        Нет аккаунта? <a href="#register" @click.prevent="showRegister">Зарегистрироваться</a>
      </p>
  
      <transition name="fade">
        <div v-if="isRegister" class="mt-8">
          <h1 class="text-2xl font-bold text-center">Регистрация</h1>
          <form @submit.prevent="register" class="my-4">
            <input
              type="text"
              v-model="registerForm.username"
              placeholder="Логин"
              class="block w-full p-2 my-2 border border-gray-300 rounded"
              required
            />
            <input
              type="password"
              v-model="registerForm.password"
              placeholder="Пароль"
              class="block w-full p-2 my-2 border border-gray-300 rounded"
              required
            />
            <input
              type="email"
              v-model="registerForm.email"
              placeholder="Email"
              class="block w-full p-2 my-2 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              class="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Регистрация
            </button>
          </form>
        </div>
      </transition>
    </div>
   <Footer/>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import Header from '~/components/Header.vue';
  
  const loginForm = ref({ username: '', password: '' });
  const registerForm = ref({ username: '', password: '', email: '' });
  const isRegister = ref(false);
  
  const { $jwtAuth } = useNuxtApp()
  const router = useRouter()

  async function login() {
  try {
    // Создание экземпляра FormData
    const formData = new FormData();
    formData.append('username', loginForm.value.username);
    formData.append('password', loginForm.value.password);

    await $jwtAuth.login(
      formData,
      (data) => {
        console.log(data);
        window.location.replace('/');
      }
    );
  } catch (e) {
    // ваша обработка ошибок
    console.error(e);
  }
}

  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
  }
  </style>
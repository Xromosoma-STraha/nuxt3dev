<template>
    <form @submit.prevent="submitForm">      
      <div>
        <label for="userName">Username</label>
        <input type="text" id="userName" v-model="userName" placeholder="Username" class="text-black" />
        <p class="text-red-500 text-xs italic" v-if="errors.userName">{{ errors.userName }}</p>
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" placeholder="Password" class="text-black"/>
        <p class="text-red-500 text-xs italic" v-if="errors.password">{{ errors.password }}</p>
      </div>
      <div>
        <label for="passwordConfirmation">Confirm Password</label>
        <input type="password" id="passwordConfirmation" v-model="passwordConfirmation" placeholder="Confirm Password" class="text-black"/>
        <p class="text-red-500 text-xs italic" v-if="errors.passwordConfirmation">{{ errors.passwordConfirmation }}</p>
      </div>
      <button type="submit" :disabled="isSubmitting" class="text-white">
        {{ isSubmitting ? 'Submitting...' : 'Register' }}
      </button>
    </form>
</template>
  
  <script setup lang="ts">
  import { ref } from 'vue';

  import { useRouter } from '#app';
  
  const userName = ref('');
  const password = ref('');
  const passwordConfirmation = ref('');
  const isSubmitting = ref(false);
  const errors = ref({} as { 
	email?: string;
	userName?: string; 
	password?: string; 
	passwordConfirmation?: string; 
});

  const router = useRouter();
  
  const submitForm = async () => {
      errors.value = {}; // Очистка ошибок перед валидацией
  
    // Валидация пароля и имени пользователя
    if (password.value !== passwordConfirmation.value) {
      errors.value.passwordConfirmation = 'Passwords do not match';
    }
  
      if(Object.keys(errors.value).length > 0) return; // Прерываем, если есть ошибки валидации
  
    isSubmitting.value = true;
  
    try {
          const { data, error } = await useFetch('/api/register', {
        method: 'POST',
        body: {
          userName: userName.value,
          password: password.value,
        },
      });
  
          if(error.value){
              if (error.value.data?.statusCode === 409) {
                  errors.value.userName = 'Username already exists';
              } else {
                  console.error('Registration error', error.value);
                  alert('Registration failed. See console for details.');
              }
              return; // Выходим из функции, если есть ошибка
          }
  
      router.push('/loginpage');
    } catch (err) {
      console.error('Registration error', err);
      alert('Registration failed. See console for details.');    
    } finally {
      isSubmitting.value = false;
    }
  };
  </script>
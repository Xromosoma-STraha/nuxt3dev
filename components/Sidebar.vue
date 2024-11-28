<template>
    <aside class="px-5 py-8 bg-sidebar h-full relative w-full">
        <NuxtLink to="/" class="mb-10 block">
            <NuxtImg src="/logo.jpg" alt="" width="100px" class="mx-auto"/>
        </NuxtLink>
        
        <button @click="logout" class="absolute top-2 right-3 transition-colors hover:text-primary">
            <Icon name="solar:logout-2-outline" size="20px"/>
        </button>
        <Menu/>
    </aside>
    
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useRouter } from '#app' // Импортируем useRouter

const authStore = useAuthStore()
const router = useRouter() // Создаем экземпляр useRouter

async function logout() {
  authStore.logout()  // Вызываем action logout из хранилища
    console.log('Выход выполнен');

  await router.push('/loginpage'); // Перенаправляем на страницу входа

}
    
</script>
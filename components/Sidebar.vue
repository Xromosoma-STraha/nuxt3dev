<template>
  <aside
      class="px-5 py-8 bg-sidebar h-full relative w-20 transition-all duration-300 overflow-hidden"
      :class="{ 'sidebar-open': isSidebarOpen }"
      @mouseenter="isSidebarOpen = true"
      @mouseleave="isSidebarOpen = false"
  >
      <NuxtLink to="/" class="mb-10 block">
          <NuxtImg src="/logo.jpg" alt="" width="100px" class="mx-auto" :class="{'sidebar-open': isSidebarOpen }"/>
      </NuxtLink>

      <button @click="logout" class="absolute top-2 right-3 transition-colors hover:text-primary">
          <Icon name="solar:logout-2-outline" size="20px"/>
      </button>
       <div class="menu-icons" v-if="!isSidebarOpen">
          <div v-for="item in menuData" :key="item.name">
             <NuxtLink :to="item.url"> <Icon :name="item.icon" size="25px"></Icon></NuxtLink>
          </div>
       </div>
      <div class="sidebar-content" :class="{ 'sidebar-open': isSidebarOpen }">
             <div v-if="userData">
              <img v-if="userData.avatarUrl" :src="userData.avatarUrl" alt="avatar" class="user-avatar"/>
              <p>{{ userData.firstName }} {{userData.lastName}}</p>
              <p>ID: {{userData.id}}</p>
             </div>
         <Menu/>
      </div>
  </aside>
  
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useRouter, useFetch } from '#app' // Импортируем useRouter
import { ref, onMounted, watch } from 'vue';
import {MENU_DATA} from "./menu.data";

const authStore = useAuthStore()
const router = useRouter() // Создаем экземпляр useRouter
const userData = ref<User | null>(null)
const isSidebarOpen = ref(false);
const menuData = ref(MENU_DATA)
interface User {
  firstName: string;
  lastName: string;
  id: number;
   avatarUrl:string | null
}

watch(()=>authStore.userId, async(userId,oldUserId) => {
   if(userId){
      try{
          const response = await $fetch<User>(`/api/users/${userId}`, {
          method: 'GET',
          });
            userData.value = response
      }
      catch(error) {
           console.error("не удалось получить пользователя", error)
            userData.value = null;
      }
  } else {
       userData.value = null;
  }
}, { immediate: true })


async function logout() {
authStore.logout()  // Вызываем action logout из хранилища
  console.log('Выход выполнен');

await router.push('/loginpage'); // Перенаправляем на страницу входа

}
  
</script>

<style scoped>
.sidebar {
  background-color: rgb(23,30,48);
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 5rem; /* Initial width for collapsed sidebar */
  padding: 20px;
  color: #fff;
  overflow: hidden;
  
}

.sidebar-open {
  width: 15.625rem;
}

.sidebar-content{
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}
.sidebar-open .sidebar-content {
  opacity: 1;
}
.user-avatar{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  opacity:0;
  transition: opacity 0.2s ease-in-out;
}
.sidebar-open .user-avatar{
    opacity:1;
}
.menu-icons{
display: flex;
flex-direction: column;
  align-items: center;
  gap:15px;
  transition: opacity 0.2s ease-in-out;
}

.px-5 {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
.py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.bg-sidebar {
  background-color: rgb(23,30,48);
}
.h-full {
  height: 100%;
}
.relative {
  position: relative;
}
.w-full {
  width: 100%;
}
.mb-10 {
  margin-bottom: 2.5rem;
}
.block {
  display: block;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.absolute {
  position: absolute;
}
.top-2 {
  top: 0.5rem;
}
.right-3 {
  right: 0.75rem;
}
.transition-colors {
  transition-property: color;
  transition-duration: 150ms;
}
.hover\:text-primary:hover {
  color: rgb(79, 70, 229);
}
</style>
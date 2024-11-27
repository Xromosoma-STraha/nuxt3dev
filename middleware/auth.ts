import { defineNuxtRouteMiddleware, navigateTo } from '#app';
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  
    const authStore = useAuthStore()
    authStore.checkAuth()
    console.log("Middleware запущен", to.path, from.path);



    if (to.path === '/loginpage' && authStore.isAuthenticated) {
        console.log("Перенаправление на '/'");
        return navigateTo('/');
    } else if (to.path !== '/loginpage' && ! authStore.isAuthenticated) {
        console.log("Перенаправление на '/loginpage'");
        return navigateTo('/loginpage');
    }
});
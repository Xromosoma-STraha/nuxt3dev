import { defineNuxtRouteMiddleware, navigateTo, useCookie } from '#app';
import { useAuthStore } from '~/stores/auth';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import type { RouteLocationNormalized } from 'vue-router';


interface JwtPayloadWithId extends JwtPayload {
    idU?: number;
}
interface CustomRouteLocationNormalized extends RouteLocationNormalized {
    context?: {
       auth?: {
        user:{
            id:number
        }
       }
    }
}
export default defineNuxtRouteMiddleware(async (to: CustomRouteLocationNormalized, from:CustomRouteLocationNormalized ) => {
    const authStore = useAuthStore();
    console.log("Middleware запущен", to.path, from.path);
    const token = useCookie('token').value;
      if (token) {
            try {
              const decodedToken = jwtDecode<JwtPayloadWithId>(token);
                const userId = decodedToken?.idU;
                 if(userId){
                       authStore.login(token);
                    to.context = {
                      auth: {
                       user: {
                         id: userId
                       }
                     }
                  }
                   }
              } catch (error) {
                console.error("Ошибка декодирования токена")
                authStore.logout()
                return navigateTo('/loginpage');
              }
          } else {
            authStore.logout()
        }
          await authStore.checkAuth()

    if (to.path === '/loginpage' && authStore.isAuthenticated) {
        console.log("Перенаправление на '/'");
        return navigateTo('/');
    } else if (to.path !== '/loginpage' && !authStore.isAuthenticated) {
        console.log("Перенаправление на '/loginpage'");
        return navigateTo('/loginpage');
    }
});
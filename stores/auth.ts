import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { navigateTo } from '#app'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: null as string | null,
    userId: null as number | null,
  }),
  getters: {
    getToken: (state) => state.token
  },
  actions: {
    setToken(token: string | null) {
      this.token = token;
       useCookie('token').value = token;
    },
    checkAuth() {
      const cookie = useCookie('token'); // maxAge устанавливается при Set-Cookie на backend
      const token = cookie.value;

      if (token) {
          try {
              const decodedToken: any = jwtDecode(token);
              // Проверяем срок действия токена только если он есть
              if (decodedToken.exp * 1000 > Date.now()) {
                  this.isAuthenticated = true;
                  this.token = token;
                  this.userId = decodedToken.idU;
              } else {
                  // Если токен просрочен, выходим
                  this.logout();
              }
          } catch (error) {
              console.error("Ошибка декодирования токена:", error);
              this.logout();
          }
      }      
    },
      async logout() {
                try{
            await $fetch('/api/logout', { method: 'POST' });  // Запрос на сервер для удаления cookie          
              this.isAuthenticated = false;
              this.user = null;
                this.userId = null
              this.setToken(null);
                
        }
                 catch(error){
                      console.log("Logout failed", error)
                 }        
    },    
    login(token: string) {
          try {
              const decodedToken: any = jwtDecode(token);
              this.userId = decodedToken.idU
              this.setToken(token);
              this.isAuthenticated = true;
        }
         catch(e){
                this.logout()
         }
    }
  }
});
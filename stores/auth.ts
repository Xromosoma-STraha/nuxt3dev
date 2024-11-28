import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: null as string | null
  }),
  getters: {
    getToken: (state) => state.token
        // можно добавить другие геттеры, например, для получения имени пользователя
  },
    actions:{
        setToken(token: string | null){
            this.token = token;
            useCookie('token').value = token
        },
        checkAuth(){
             const cookie = useCookie('token',{maxAge: 60*60*24*7});
            const token = cookie.value;
            if(token){
                this.isAuthenticated = true
                  this.token = token;
                try{
                    const decodedToken: any = jwtDecode(token);
                    if(decodedToken.exp * 1000 > Date.now()){
                        this.isAuthenticated = true;
                          this.token = token;
                    }
                    else{
                        this.logout()
                    }
                }
                catch(error){
                    console.log(error);
                    this.logout()
                }
            }
        },
        login(token:string){
            this.setToken(token)
            this.isAuthenticated = true
        },
        logout(){
            this.isAuthenticated = false
            this.user = null
            this.setToken(null)
        }
    }
})
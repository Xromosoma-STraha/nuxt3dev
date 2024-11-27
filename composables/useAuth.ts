import { useState } from '#app'
import {jwtDecode} from 'jwt-decode';


export const useAuth = () => {
    const isAuthenticated = useState('isAuthenticated', () => {
        console.log('isAuthenticated initial');
        const token = useCookie('token').value;
        console.log('token в useAuth', token);

        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                console.log("decodedToken.exp:", decodedToken.exp);
                console.log("Date.now():", Date.now());
                return decodedToken.exp * 1000 > Date.now();
            } catch (error) {
                console.error("Ошибка декодирования токена в useAuth:", error);
                return false;
            }
        } else {
            return false;
        }
    });

    const login = () => {
        console.log('login запущен');
        isAuthenticated.value = true;
        console.log("isAuthenticated.value после login:", isAuthenticated.value);
    };

    const logout = () => {
        console.log('logout запущен');
        isAuthenticated.value = false;
        useCookie('token').value = null;
        console.log("isAuthenticated.value после logout:", isAuthenticated.value);
    };

    const checkAuth = () => {
        console.log('checkAuth запущен');
        const token = useCookie('token').value;
        console.log('token в checkAuth', token);

        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                isAuthenticated.value = decodedToken.exp * 1000 > Date.now();
                console.log("isAuthenticated.value после checkAuth (с токеном):", isAuthenticated.value);
            } catch (error) {
                console.error("Ошибка проверки токена в checkAuth:", error);
                isAuthenticated.value = false;
            }
        } else {
            isAuthenticated.value = false;
            console.log("isAuthenticated.value после checkAuth (без токена):", isAuthenticated.value);
        }
    };

    return { isAuthenticated, login, logout, checkAuth };
};




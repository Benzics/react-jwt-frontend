import axios from "axios";

const API_URL = 'http://localhost:8000/api/users/';

class AuthService {
    // our login function
    async login(username, password) {
        try {
            const response = await axios.post(API_URL + 'login', {
                username: username,
                password: password,
            });
            
            if(response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            return true;
        } catch (error) {
            console.log(error);
        }

        return false;
    }

    // user registration
    async register(data) {
        try {
            const response = await axios.post(API_URL + 'register', data, {headers: {'Content-Type': 'application/json'}});

            return response.data;
        } catch (error) {
            console.log(error);
        }
        return false;
    }

    getUserToken() {
        return localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
    }
}

export default new AuthService();
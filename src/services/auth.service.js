import axios from "axios";

const API_URL = 'http://localhost:8000/api/users/';

class AuthService {
    // our login function
    async login(username, password) {
       
        const response = await axios.post(API_URL + 'login', {
            username: username,
            password: password,
        });
        if(response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        
        return response.data;


    }

    // user registration
    async register(data) {
        const response = await axios.post(API_URL + 'register', data, {headers: {'Content-Type': 'multipart/form-data'}});

        return response.data;
    }

    getUserToken() {
        return localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
    }
}

export default new AuthService();
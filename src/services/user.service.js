import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8000/api/users/';
class UserService {
    
    async userDetails() {
        try {
            const response = await axios.get(API_URL + 'me', {headers: authHeader()});
            return response.data;
        } catch (error) {
            console.log(error);
        }

        return {};
    }
}
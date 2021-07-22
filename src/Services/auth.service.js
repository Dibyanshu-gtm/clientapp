import axios from "axios";


// const API_URL="http://localhost:8080/";
const API_URL= "https://stockexchangebackend.herokuapp.com/"
class AuthService{
    login(username,password){
        
        return axios
        .post(API_URL+"signin",{
            username,
            password
        })
        .then(response=>{
            localStorage.setItem("user", JSON.stringify(response.data));
            console.log(response);
            return response.data;
        });
    }
    logout() {
        localStorage.removeItem("user");
      }
      register(username, email, password) {
        return axios.post(API_URL + "setuserapi", {
          username,
          email,
          password
        });
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
      }
      
}
export default new AuthService();
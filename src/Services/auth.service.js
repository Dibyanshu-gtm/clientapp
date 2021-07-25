import axios from "axios";


//const API_URL="http://localhost:8080/auth/";
const API_URL= "https://stockexchangebackend.herokuapp.com/auth/"
class AuthService{
    login(username,password){
        
        return axios
        .post(API_URL+"signin",{
            username,
            password
        })
        .then(response=>{
            {
             if(response.data.accessToken &&response.data!="User Not confirmed his email" && response.data!="") {

            localStorage.setItem("user", JSON.stringify(response.data));
          
          }
          else if(response.data=="")
          {
            alert('You have not registered for the website');
          }
            else
            {
              alert('Email has not been Confirmed');
            }
            console.log(response);
            return response.data;
        }});
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
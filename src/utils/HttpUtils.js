import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

//Se agrega la URL base de nuestra API
axios.defaults.baseURL = "http://localhost:3000/api";

class HttpUtils {
  static get(endpoint) {
    axios
      .get(endpoint)
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .catch(e => {
        return e.response;
      });
  }

  /*static async get(endpoint){ 
        try{
            const response = await axios.get(endpoint);
            return response;
        }catch(error){
            return error;
        }       
      } */
}
export default HttpUtils;

import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:8080/api/test/";

class UserService {
  getPublicContent() {
    // return axios.get(API_URL + "all");
    return Promise.resolve({
      data: "This is the main content"
    });
  }

  getUserBoard() {
    // return axios.get(API_URL + "user", { headers: authHeader() });
    return Promise.resolve({
      data: "This is the content for a user..."
    });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new UserService();

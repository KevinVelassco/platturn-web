import axios from "axios";
import authHeader from "./auth.header";

const API_URL = process.env.VUE_APP_API_BASE_URL;

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

  async changeEmailAddress(user) {
    const response = await axios.post(
      API_URL + "users/change-email-address",
      {
        email: user.email,
        repeatedEmail: user.repeatedEmail
      },
      { headers: authHeader() }
    );

    const { data } = response;

    return data;
  }
}

export default new UserService();

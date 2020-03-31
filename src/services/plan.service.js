import axios from "axios";

const API_URL = process.env.VUE_APP_API_BASE_URL;

class PlanService {
  async getPlans() {
    const response = await axios.get(API_URL + "plans");

    const { data } = response;

    return data;
  }
}
export default new PlanService();

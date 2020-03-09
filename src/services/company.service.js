import axios from "axios";
import authHeader from "./auth.header";

const API_URL = process.env.VUE_APP_API_BASE_URL;

class CompanyService {
  async getUserCompanies() {
    const response = await axios.get(API_URL + "companies/get-user-companies", {
      headers: authHeader()
    });

    const { data } = response;

    return data;
  }

  async createCompany(company) {
    const response = await axios.post(
      API_URL + "companies",
      {
        name: company.name,
        code: company.code,
        document: company.document,
        email: company.email
      },
      { headers: authHeader() }
    );

    const { data } = response;

    return { ...data, message: "company created" };
  }
}

export default new CompanyService();

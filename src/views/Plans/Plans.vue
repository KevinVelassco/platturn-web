<template src="./Plans.html" />
<script>
import planService from "../../services/plan.service";
import { getFromObjectPathParsed } from "../../utils/functions";

export default {
  name: "Plans",
  data() {
    return {
      plans: [],
      message: "",
      loading: true
    };
  },
  methods: {
    loadPlans() {
      planService.getPlans().then(
        data => {
          this.plans = data;

          this.plans.length !== 0
            ? (this.message = "")
            : (this.message =
                "No se encuentran planes disponibles por el momento");

          this.loading = false;
        },
        error => {
          this.message = getFromObjectPathParsed(
            error,
            "response.data.message"
          );

          this.message =
            this.message ||
            (error.response && error.response.data) ||
            error.message ||
            error.toString();

          this.loading = false;
        }
      );
    }
  },
  created() {
    this.loadPlans();
  }
};
</script>
<style src="./Plans.css" scoped></style>

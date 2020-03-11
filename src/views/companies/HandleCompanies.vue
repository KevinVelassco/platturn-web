<template>
  <div>
    <div class="row actions">
      <div class="col-md-4 col-lg-3">
        <button
          type="button"
          class="btn btn-success"
          data-toggle="button"
          aria-pressed="false"
          v-on:click="initCreating"
          :disabled="updating || creating"
        >
          Nueva
        </button>
      </div>
    </div>
    <div class="row">
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
      <div class="col-md-4 col-lg-3" v-if="creating">
        <Create v-bind:bus="bus"></Create>
      </div>

      <div
        class="col-md-4 col-lg-3"
        v-for="company in companies"
        :key="company.id"
      >
        <Update
          v-if="updating"
          v-bind:company="company"
          v-bind:bus="bus"
        ></Update>
        <div class="card" v-if="!updating">
          <img
            class="card-img-top"
            src="https://storage.googleapis.com/platturn-dev-bucket/public/companies/default-logo.png"
            alt="Card image cap"
          />
          <div class="card-body">
            <h4 class="card-title">{{ company.name }}</h4>
            <p class="card-text">
              <span class="badge badge-secondary">Código:</span>
              {{ company.code }}
              <br />
              <span class="badge badge-secondary">Documento:</span>
              {{ company.document }}
              <br />
              <span class="badge badge-secondary">Email:</span>
              {{ company.email }}
            </p>
            <button
              class="btn btn-primary btn-block"
              :disabled="creating"
              v-on:click.prevent="initUpdating"
            >
              <font-awesome-icon icon="edit" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import companyService from "../../services/company.service";
import Create from "./Create";
import Update from "./Update";
import { getFromObjectPathParsed } from "../../utils/functions";
export default {
  name: "HandleCompanies",
  data() {
    return {
      companies: [],
      successful: false,
      message: "",
      creating: false,
      updating: false,
      bus: new Vue()
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (!this.loggedIn) {
      this.$router.push("/login");
    }

    this.loadCompanies();
    this.bus.$on("load-companies", this.loadCompanies);
    this.bus.$on("cancel-updating", this.cancelUpdating);
    this.bus.$on("cancel-creating", this.cancelCreating);
  },
  methods: {
    loadCompanies() {
      companyService.getUserCompanies().then(
        data => {
          this.successful = true;

          this.companies = data;
        },
        error => {
          this.successful = false;

          this.message = getFromObjectPathParsed(
            error,
            "response.data.message"
          );

          this.message =
            this.message ||
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    initCreating() {
      this.creating = !this.creating;
      this.updating = false;
    },
    cancelCreating() {
      this.creating = false;
    },
    initUpdating() {
      this.updating = !this.updating;
      this.creating = false;
    },
    cancelUpdating() {
      this.updating = false;
    }
  },
  components: {
    Create,
    Update
  }
};
</script>
<style scoped>
.card {
  margin-top: 1rem;
}

.actions {
  margin-top: 1rem;
}
</style>

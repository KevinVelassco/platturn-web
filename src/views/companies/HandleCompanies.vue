<template>
  <div class="row initial-row">
    <div class="col-md-12 content">
      <div class="row">
        <div class="col-6 col-sm-8 col-md-9 title">
          <span>Empresas</span>
        </div>
        <div class="col-6 col-sm-4 col-md-3 text-right">
          <button
            type="button"
            class="btn btn-success"
            @click="showCreatingModal = true"
          >
            <font-awesome-icon class="mr-2 " icon="plus" size="sm" />

            <span class="font-weight-bold">Nuevo</span>
          </button>
        </div>
        <div class="col-12 separator">
          <div class="form-group">
            <input
              v-model="searchQuery"
              id="query"
              name="query"
              class="form-control"
              placeholder="Busqueda"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-center">
          <font-awesome-icon
            style="cursor: pointer"
            class="text-muted"
            icon="angle-down"
            size="lg"
            @click="filter = !filter"
          />
        </div>
        <div class="col-12">
          <div class="form-group filterColumns" v-show="filter">
            <v-select multiple v-model="columnSelected" :options="columns" />
          </div>
        </div>
      </div>
      <div class="row" v-if="message">
        <div
          class="alert"
          :class="successful ? 'alert-success' : 'alert-danger'"
        >
          {{ message }}
        </div>
      </div>
      <Grid
        v-bind:rows="companies"
        v-bind:columns="filterColumns"
        v-bind:filterKey="searchQuery"
        v-bind:limit="5"
        v-bind:bus="bus"
      />
    </div>
    <!-- use the modal component, pass in the prop -->
    <Modal
      v-if="showCreatingModal"
      @close="endCreating()"
      sizeModal="col-12 col-sm-10 col-md-6 col-lg-5"
    >
      <div slot="header">Creación</div>
      <Create v-bind:bus="bus" slot="body" />
    </Modal>

    <!-- use the modal component, pass in the prop -->
    <Modal
      v-if="showUpdatingModal"
      @close="endUpdating()"
      sizeModal="col-12 col-sm-10 col-md-6 col-lg-5"
    >
      <div slot="header">Actualizar</div>
      <Update v-bind:bus="bus" v-bind:company="currentCompany" slot="body" />
    </Modal>

    <Modal
      v-if="showDeletingModel"
      @close="endDeleting()"
      sizeModal="col-12 col-sm-10 col-md-6 col-lg-5"
    >
      <div slot="header">Eliminar</div>
      <Delete v-bind:bus="bus" v-bind:company="currentCompany" slot="body" />
    </Modal>
  </div>
</template>
<script>
import Vue from "vue";
import Grid from "../../components/Grid/Grid";
import Modal from "../../components/Modal/Modal";
import Create from "./Create";
import Update from "./Update";
import Delete from "./Delete";
import companyService from "../../services/company.service";
import { getFromObjectPathParsed } from "../../utils/functions";

export default {
  data() {
    return {
      companies: [],
      currentCompany: null,
      columns: ["id", "name", "code", "document", "email", "actions"],
      successful: false,
      message: "",
      showCreatingModal: false,
      showUpdatingModal: false,
      showDeletingModel: false,
      searchQuery: "",
      columnSelected: [],
      filter: false,
      bus: new Vue()
    };
  },
  components: {
    Grid,
    Modal,
    Create,
    Update,
    Delete
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    filterColumns() {
      let columns = this.columns;
      this.columnSelected.forEach(function(element) {
        columns = columns.filter(e => e != element);
      });
      return columns;
    }
  },
  methods: {
    async loadCompanies() {
      try {
        const data = await companyService.getUserCompanies();
        this.companies = data.map(item => {
          return {
            ...item,
            actions: [
              {
                name: "edit",
                description: "editar",
                class: "text-primary",
                eventName: "init-updating"
              } /*,
              {
                name: "delete",
                description: "eliminar",
                class: "text-danger",
                eventName: "init-deleting"
              }*/
            ]
          };
        });
        this.successful = true;
      } catch (error) {
        this.successful = false;
        this.message = getFromObjectPathParsed(error, "response.data.message");
      }
    },
    initCreating() {
      this.showCreatingModal = true;
    },
    endCreating() {
      this.showCreatingModal = false;
    },
    initUpdating(company) {
      this.showUpdatingModal = true;
      this.currentCompany = company;
    },
    endUpdating() {
      this.showUpdatingModal = false;
      this.currentCompany = null;
    },
    initDeleting(company) {
      this.showDeletingModel = true;
      this.currentCompany = company;
    },
    endDeleting() {
      this.showDeletingModel = false;
      this.currentCompany = null;
    }
  },
  mounted() {
    if (!this.loggedIn) {
      this.$router.push("/login");
    }

    this.loadCompanies();
    this.bus.$on("load-companies", this.loadCompanies);
    this.bus.$on("end-creating", this.endCreating);
    this.bus.$on("init-updating", this.initUpdating);
    this.bus.$on("end-updating", this.endUpdating);
    this.bus.$on("init-deleting", this.initDeleting);
    this.bus.$on("end-deleting", this.endDeleting);
  }
};
</script>
<style scoped>
.initial-row {
  margin-top: 1rem;
}
.content {
  padding-top: 25px;
  padding-bottom: 10px;
  padding-right: 10px;
  padding-left: 10px;
  -webkit-box-shadow: 0px 0px 12px -8px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 12px -8px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 12px -8px rgba(0, 0, 0, 0.75);
}
.title {
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 22px;
}
.separator {
  border-top: 2px solid red;
  padding-top: 10px;
}
.filterColumns {
  color: red !important;
  font-weight: 600;
}
</style>

<template src="./Usuarios.html" />
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      loading: true,
      dialog: false,
      notas: [],
      nota: { nombre: "", descripcion: "" },
      notaDefault: {},
      search: "",
      headers: [
        { text: "Nombre", value: "nombre" },
        { text: "Descripción", value: "descripcion" },
        { text: "Acciones", value: "acciones", sortable: false }
      ],
      editedIndex: false
    };
  },
  computed: {
    formTitle() {
      return !this.editedIndex ? "Nueva Nota" : "Editar Nota";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  async created() {
    try {
      const response = await this.axios.get("/nota");
      this.notas = response.data;
      this.loading = false;
      Object.assign(this.notaDefault, this.nota);
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    ...mapMutations("Mensajes", ["addmessage"]),

    async agregarNota() {
      try {
        const response = await this.axios.post("/nueva-nota", this.nota);
        this.notas.push(response.data);
        //this.addmessage("success","Registro Creado Exitosamente.");
        //store.commit('addmessage', 'sucess', "funcional")
      } catch (e) {
        console.error(e);
      }
    },

    async editarNota(item) {
      try {
        const response = await this.axios.put(`/nota/${item._id}`, item);
        let index = this.notas.findIndex(
          item => item._id === response.data._id
        );
        Object.assign(this.notas[index], response.data);
        this.addmessage("success", "Registro Actualizado Exitosamente.");
      } catch (e) {
        console.error(e);
      }
    },

    async deleteItem(item) {
      try {
        const response =
          confirm("Seguro que desea eliminar este registro?") &&
          (await this.axios.delete(`/nota/${item._id}`));
        let index = this.notas.findIndex(
          item => item._id === response.data._id
        );
        this.notas.splice(index, 1);
      } catch (e) {
        console.error(e);
      }
    },

    editItem(item) {
      this.editedIndex = true;
      this.nota = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.nota = Object.assign({}, this.notaDefault);
      this.editedIndex = false;
    },

    async save() {
      if (this.editedIndex) {
        await this.editarNota(this.nota);
      } else {
        await this.agregarNota();
      }
      this.close();
    }
  }
};
</script>
<style src="./Usuarios.css" />

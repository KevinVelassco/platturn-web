<template>
  <div v-if="actions.length" class="row">
    <div class="col-md-12">
      <span
        v-for="action in actions"
        :key="action.name"
        :class="action.class"
        @click.prevent="handleClick(action.eventName, row)"
      >
        <font-awesome-icon
          class="icon"
          v-if="action.name === 'edit'"
          icon="edit"
          size="lg"
        />
        <font-awesome-icon
          class="icon"
          v-else-if="action.name === 'delete'"
          icon="trash-alt"
          size="lg"
        />
        <font-awesome-icon
          class="icon"
          v-else-if="action.name === 'view'"
          icon="eye"
          size="lg"
        />
        <span v-else>{{ action.description }}</span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "ActionsColumn",
  props: {
    actions: {
      type: Array,
      default: () => []
    },
    row: {
      type: Object,
      default: null
    },
    bus: {
      type: Object,
      defult: null
    }
  },
  methods: {
    handleClick(eventName, p1) {
      // console.log("eventName", eventName);
      // console.log("p1", p1);
      this.bus.$emit(eventName, p1);
    }
  }
};
</script>
<style scoped>
.icon {
  margin-right: 8px !important;
  cursor: pointer;
}
.row {
  margin-right: -15px !important;
  margin-left: -15px !important;
}
</style>

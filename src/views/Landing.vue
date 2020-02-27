<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>

<script>
export default {
  name: "Landing",
  data() {
    return {
      content: "This is the landing"
    };
  }
};
</script>

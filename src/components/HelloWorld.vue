<template>
  <div class="hello">
    <template v-if="true">
      <button @click="incCount">Increment</button>
    </template>
    <h1>{{ msg }}</h1>
    <h1>{{ message }}</h1>
    <h1>{{ count }}</h1>
    <h1>store counter: {{ getCounter }}</h1>
    <template v-if="true">
      <h1>route param: {{ getRouteParam }}</h1>
    </template>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  computed: {
    getCounter() {
      return this.$store.state.counter;
    },
    getRouteParam() {
      return this.$route.params.id;
    }
  },
  data() {
    return {
      message: "Data message",
      count: 0,
    };
  },
  methods: {
    incCount() {
      this.count++;
      this.$store.dispatch('increment');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

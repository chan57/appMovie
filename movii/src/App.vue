<template>
<div id="app">

</div>

</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'app',
  components: {},
  mounted() {
    this.fetchMovies()
  },
  methods: {
    ...mapActions("movis", ["fetchMovies"])
  }
}
</script>

<style>

</style>

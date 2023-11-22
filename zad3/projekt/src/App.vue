<template>
  <div id="app" class="container">
    <SearchEngine @search="getFilterEvent"/>
    <TableWithMovies :filter="filter" ref="tmovies"/>
    <MoviesByGenre/>
    <MoviesByCast/>
  </div>
</template>

<script>

import SearchEngine from './components/SearchEngine.vue'
import TableWithMovies from './components/TableWithMovies.vue'
import MoviesByGenre from './components/MoviesByGenre.vue'
import MoviesByCast from './components/MoviesByCast.vue'

export default {
  name: 'App',
  components: {
    SearchEngine,
    TableWithMovies,
    MoviesByGenre,
    MoviesByCast,
  },
  data() {
    return {
      filter: {
        title: '',
        productionFrom: '',
        productionTo: '',
        cast: ''
      },
    };
  },
  methods: {
    getFilterEvent(data) {
      //console.log(data);
      this.filter = data;
      this.$refs.tmovies.displayTenMovies(10);
    },
  }
}
</script>

<style>
#app {
  margin-top: 20px;
}
</style>

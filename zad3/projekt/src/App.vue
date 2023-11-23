<template>
  <div id="app" class="container">
    <SearchEngine @search="getFilterEvent"/>
    <TableWithMovies :filter="filter" :movies="movies" ref="tmovies"/>
    <MoviesByGenre :movies="movies"/>
    <MoviesByCast :movies="movies"/>
  </div>
</template>

<script>

import SearchEngine from './components/SearchEngine.vue'
import TableWithMovies from './components/TableWithMovies.vue'
import MoviesByGenre from './components/MoviesByGenre.vue'
import MoviesByCast from './components/MoviesByCast.vue'

import json from './assets/movies.json';

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
      movies : json.slice(25000, 35000),
    };
  },
  methods: {
    getFilterEvent(data) {
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

<template>
  <div id="app" class="container">
    <SearchEngine/>
    <TableWithMovies/>
    <MoviesByGenre/>
    <MoviesByCast/>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import SearchEngine from './components/SearchEngine.vue'
import TableWithMovies from './components/TableWithMovies.vue'
import MoviesByGenre from './components/MoviesByGenre.vue'
import MoviesByCast from './components/MoviesByCast.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld,
    SearchEngine,
    TableWithMovies,
    MoviesByGenre,
    MoviesByCast,
  }
}
</script>

<style>
#app {
  margin-top: 20px;
}
</style>

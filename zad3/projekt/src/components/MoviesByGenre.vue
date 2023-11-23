<template>  
  <h1>Filmy wg gatunku</h1>
      <em class="task">
        <div v-for="(movies, genre) in genres" :key="genre">
          <p>{{ genre }}</p>
          <ol>
            <li v-for="movie in movies" :key="movie">{{ movie }}</li>
          </ol>
        </div>
      </em>
</template>

<script>
export default {
  props: {
    movies: Array,
  },
  data() {
    return {
      genres: {},
    }
  },
  methods: {
    groupMovies() {
      let selectedMovies = [];
      let i = 0, count = 0;
      while(count < 100) {
        if(this.movies[i].genres.length > 0) {
          selectedMovies.push(this.movies[i]);
          count++
        }
        i++;
      }
      
      selectedMovies.forEach(movie => {
        movie.genres.forEach(genre => {
          if(this.genres[genre]) {
            this.genres[genre].push(movie.title);
          } else {
            this.genres[genre] = [movie.title];
          }
        }
      )});
    }
  },

  mounted() {
    this.groupMovies();
  },
}
</script>

<style scoped>
</style>
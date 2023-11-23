<template>  
  <h1>Filmy wg obsady</h1>
      <em class="task">
        <div v-for="(movies, actor) in actors" :key="actor">
          <p>{{ actor }}</p>
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
      actors: {},
    }
  },
  methods: {
    groupMovies() {
      let selectedMovies = [];
      let i = 0, count = 0;
      while(count < 100) {
        if(this.movies[i].cast.length > 0) {
          selectedMovies.push(this.movies[i]);
          count++
        }
        i++;
      }
      selectedMovies.forEach(movie => {
        movie.cast.forEach(actor => {
          if(this.actors[actor]) {
            this.actors[actor].push(movie.title);
          } else {
            this.actors[actor] = [movie.title];
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
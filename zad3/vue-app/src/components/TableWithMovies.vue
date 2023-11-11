<template>  
  <table class="table table-condensed table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Production Year</th>
            <th>Cast</th>
            <th>Genres</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="movie in moviesToDisplay" :key="movie.id">
                <td>{{ movie.title }}</td>
                <td>{{ movie.year }}</td>
                <td>{{ movie.cast.join(', ') }}</td>
                <td>{{ movie.genres.join(', ') }}</td>
            </tr>
        </tbody>
      </table>
      <div>
           <button class="btn btn-info text-white" @click="showNextTen">Pokaż więcej</button>
      </div>
</template>

<script>
import json from '../assets/movies.json';
//import _ from 'underscore';
export default {
  data() {
    return {
      movies : json,
      moviesToDisplay: [],
    }
  },

  methods: {
    displayTenMovies(initialPosition, finalPosition) {
      for(let i = initialPosition; i < finalPosition; i++) {
        this.moviesToDisplay.push(this.movies[i]);
      }
     
    },

    showNextTen() {
      this.displayTenMovies(this.moviesToDisplay.length, this.moviesToDisplay.length + 10);
    },
  },

  mounted() {
    this.displayTenMovies(0, 10);
  },
}
</script>

<style scoped>
</style>
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

export default {
  props: {
    filter: Object,
  },
  data() {
    return {
      movies : json,
      moviesToDisplay: [],
    }
  },

  methods: {
    displayTenMovies(finalPosition) {
      this.moviesToDisplay = [];
      let moviesShown = 0;
      for(let i = 30000; i < 50000; i++) {
        if(this.filter != null) {
          if(this.filter.title != "" && !this.movies[i].title.toLowerCase().includes(this.filter.title.toLowerCase())) {
            continue;
          }
          if(this.filter.productionTo != "" && parseInt(this.movies[i].year) > parseInt(this.filter.productionTo)) {
            continue;
          }
          if(this.filter.productionFrom != "" && parseInt(this.movies[i].year) < parseInt(this.filter.productionFrom)) {
            continue;
          }
          if(this.filter.cast != "" && !this.movies[i].cast.toString().includes(this.filter.cast)) {
            continue;
          }
        }
        this.moviesToDisplay.push(this.movies[i]);
        moviesShown++;
        if(moviesShown == finalPosition) {
          break;
        }
      }     
    },

    showNextTen() {
      this.displayTenMovies(this.moviesToDisplay.length + 10);
    },
  },

  mounted() {
    this.displayTenMovies(10);
  },
}
</script>

<style scoped>
</style>
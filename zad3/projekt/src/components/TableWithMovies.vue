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
import _ from 'underscore';

export default {
  props: {
    filter: Object,
    movies: Array,
  },
  data() {
    return {
      moviesToDisplay: [],
    }
  },

  methods: {
    displayTenMovies(finalPosition) {
      this.moviesToDisplay = _.filter(this.movies, (movie) => {
      if (this.filter != null) {
        if (
         (this.filter.title != "" && !movie.title.toLowerCase().includes(this.filter.title.toLowerCase())) ||
         (this.filter.productionTo != "" && (parseInt(movie.year) > parseInt(this.filter.productionTo))) ||
         (this.filter.productionFrom != "" && (parseInt(movie.year) < parseInt(this.filter.productionFrom))) ||
          (this.filter.cast != "" && !movie.cast.toString().toLowerCase().includes(this.filter.cast.toLowerCase()))
        ) {
         return false;
        }
      }
      return true;
    }).slice(0, finalPosition);
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
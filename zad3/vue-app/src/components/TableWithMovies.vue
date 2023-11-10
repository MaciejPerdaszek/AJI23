<template>  
  <table class=" table-condensed table-hover ">
        <thead>
          <tr>
            <th>Title</th>
            <th>Production Year</th>
            <th>Cast</th>
            <th>Genres</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="movie in movies" :key="movie.id">
                <td>{{ movie.title }}</td>
                <td>{{ movie.productionYear }}</td>
                <td>{{ movie.cast }}</td>
                <td>{{ movie.genres }}</td>
            </tr>
        </tbody>
      </table>
      <em class="task">W tabeli należy poprawić wyświetlanie pól z obsadą i gatunkiem. Należy opuścić nawiasy kwadratowe</em>
</template>

<script>
</script>

<style scoped>
</style>
<template>
   <h1>Baza filmów</h1>
      <form class>
        <div class="form-group">
            <label for=inputTitle>Tytuł</label>
            <input type="text" id=inputTitle ref="title" class="form-control" placeholder="Podaj tytuł lub fragment tytułu filmu"/>
        </div>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label" for="inputProductionFrom">Rok produkcji od:</label>
          <div class="col-sm-8">
              <input type="text" id=inputProductionFrom ref="yearfrom" class="form-control"  placeholder="Liczba naturalna z przedziału 1900-2019"/>
          </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-4 col-form-label" for="inputProductionTo">Rok produkcji do:</label>
            <div class="col-sm-8">
                <input type="text" id=inputProductionTo ref="yearto" class="form-control" placeholder="Liczba naturalna z przedziału 1900-2019"/>
            </div>
        </div>
        <div class="form-group">
          <label for="inputCast">Obsada</label>
          <input type="text" id="inputCast" ref="cast" class="form-control" placeholder="Imię i nazwisko"/>
        </div>
        <div class="form-group row">
            <input type="button" @click="searchButton()" class="btn btn-info col-sm-12 text-white" value="Szukaj">
        </div>
      </form>
</template>

<script>
export default {
  data() {
    return {
      filter: {
        title: '',
        productionFrom: '',
        productionTo: '',
        cast: '',
      }
    }
  },
methods: {
    searchButton() {
      let refs = this.$refs;
      this.filter.title = refs.title.value;
      this.filter.productionFrom = refs.yearfrom.value;
      this.filter.productionTo = refs.yearto.value;
      this.filter.cast = refs.cast.value;
      this.$emit('search', this.filter);    
    }
  }
}
</script>

<style scoped>
  .form-group.row {
    margin-bottom: 15px;
  }

  .form-group {
    margin-bottom: 15px;
  }     
</style>
<template>
   <h1>Baza filmów</h1>
      <form class>
        <div class="form-group">
            <label for=inputTitle>Tytuł</label>
            <input type="text" id=inputTitle class="form-control" placeholder="Podaj tytuł lub fragment tytułu filmu"/>
        </div>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label" for="inputProductionFrom">Rok produkcji od:</label>
          <div class="col-sm-8">
              <input type="text" id=inputProductionFrom class="form-control"  placeholder="Liczba naturalna z przedziału 1900-2019"/>
          </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-4 col-form-label" for="inputProductionTo">Rok produkcji do:</label>
            <div class="col-sm-8">
                <input type="text" id=inputProductionTo class="form-control" placeholder="Liczba naturalna z przedziału 1900-2019"/>
            </div>
        </div>
        <div class="form-group">
          <label for="inputCast">Obsada</label>
          <input type="text" id="inputCast" class="form-control" placeholder="Imię i nazwisko"/>
        </div>
        <div class="form-group row">
            <input type="button" class="btn btn-info col-sm-12 text-white" value="Szukaj"/>
        </div>
      </form>
</template>

<script>

</script>

<style scoped>
  .form-group.row {
    margin-bottom: 15px;
  }

  .form-group {
    margin-bottom: 15px;
  }     
</style>
<template>
  <header class="header">
    <div>
      <BNavbar type="dark" variant="dark" class="navbar">
        <BContainer>
          <BNavbarBrand href="#">NeKinopoisk</BNavbarBrand>
          <BNavForm>
            <BFormInput
                v-model="searchValue"
                debounce="1000"
                class="mr-sm-2 search-input"
                placeholder="Search"
            />
          </BNavForm>
        </BContainer>
      </BNavbar>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Header',
  data: () => ({
    searchValue: '',
  }),
  watch: {
    searchValue: 'onSearchValueChanged',
  },
  methods: {
    ...mapActions('moviesStore', [ 'searchMovies', 'fetchMovies', 'toggleSearchState' ]),
    onSearchValueChanged(value) {
      console.log(value, 'value');
      if(value) {
        this.searchMovies(value);
        this.toggleSearchState(true);
      } else {
        this.fetchMovies();
        this.toggleSearchState(false);
      }
    },
  },
};
</script>

<style scoped>
.header {
  margin-bottom: 30px;
}

.navbar {
  background-color: rgba(0, 0, 0, 0.7) !important;
}

.search-input {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 0, 0, 0.6);
}

.search-input:focus {
  box-shadow: none;
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(0, 0, 0, 0.6);
}
</style>
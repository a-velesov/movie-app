<template>
  <div id="app">
    <MoviesList :list="moviesList" />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import MoviesList from '@/components/MoviesList';

  export default {
    name: 'App',
    components: {
      MoviesList,
    },
    computed: {
      ...mapGetters('moviesStore', [ 'moviesList' ]),
    },
    methods: {
      ...mapActions('moviesStore', [ 'fetchMovies' ]),
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>

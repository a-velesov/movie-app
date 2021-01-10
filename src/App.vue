<template>
  <div id="app">
    <PosterBg :poster="posterBg" />
    <MoviesList :list="moviesList" @changePoster="onChangePoster" />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import MoviesList from '@/components/MoviesList';
  import PosterBg from '@/components/PosterBg';

  export default {
    name: 'App',
    components: {
      PosterBg,
      MoviesList,
    },
    data: () => ({
      posterBg: ''
  }),
    computed: {
      ...mapGetters('moviesStore', [ 'moviesList' ]),
    },
    methods: {
      ...mapActions('moviesStore', [ 'fetchMovies' ]),
      onChangePoster(poster) {
        this.posterBg = poster;
      }
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
    position: relative;
  }
</style>

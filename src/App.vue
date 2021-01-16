<template>
  <div id="app">
    <PosterBg :poster="posterBg" />
    <MoviesList :list="moviesList" @changePoster="onChangePoster" />
    <MoviesPagination
      :current-page="currentPage"
      :per-page="moviesPerPage"
      :total="moviesLength"
      @pageChanged="onPageChanged"
    />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import MoviesList from '@/components/MoviesList';
  import PosterBg from '@/components/PosterBg';
  import MoviesPagination from '@/components/MoviesPagination';

  export default {
    name: 'App',
    components: {
      MoviesPagination,
      PosterBg,
      MoviesList,
    },
    data: () => ({
      posterBg: '',
    }),
    computed: {
      ...mapGetters('moviesStore', [ 'moviesList', 'currentPage', 'moviesPerPage', 'moviesLength' ]),
    },
    methods: {
      ...mapActions('moviesStore', [ 'changeCurrentPage' ]),
      onChangePoster(poster) {
        this.posterBg = poster;
      },
      onPageChanged(page) {
        this.changeCurrentPage(page);
      },
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
    position: relative;
  }
</style>

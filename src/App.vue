<template>
  <div id="app">
    <PosterBg :poster="posterBg" />
    <Header />
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
  import Header from '@/components/Header';

  export default {
    name: 'App',
    components: {
      Header,
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
    watch: {
      '$route.query': {
        handler: 'onPageQueryChange',
        immediate: true,
        deep: true,
      },
    },
    methods: {
      ...mapActions('moviesStore', [ 'changeCurrentPage' ]),
      onChangePoster(poster) {
        this.posterBg = poster;
      },
      onPageQueryChange({ page = 1 }) {
        this.changeCurrentPage(Number(page));
      },
      onPageChanged(page) {
        this.$router.push({ query: { page } });
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

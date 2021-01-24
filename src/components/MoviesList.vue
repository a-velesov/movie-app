<template>
  <BContainer>
    <h3 class="list-title">{{ listTitle }}</h3>
    <BRow>
      <template>
        <BCol cols="3" v-for="(movie, key) in list" :key="key">
          <MovieItem
              :movie="movie"
              @mouseover.native="onMouseOver(movie.Poster)"
              @showModal="onShowMovieInfo"
              @removeItem="onRemoveItem"
          />
        </BCol>
      </template>
    </BRow>
    <BModal
        body-class="movie-modal-body"
        content-class="movie-modal-content"
        :id="movieInfoModalId"
        size="xl"
        hide-footer
        hide-header>
      <MovieInfo :movie="selectedMovie"
                 @closeModal="onCloseModal" />
    </BModal>
  </BContainer>
</template>

<script>
import MovieItem from '@/components/MovieItem';
import { mapActions, mapGetters } from 'vuex';
import MovieInfo from '@/components/MovieInfo';

export default {
  name: 'MoviesList',
  components: {
    MovieInfo,
    MovieItem,
  },
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    movieInfoModalId: 'movie-info',
    selectedMovieId: '',
  }),
  computed: {
    ...mapGetters('moviesStore', [ 'isSearchBool' ]),
    listTitle() {
      return this.isSearchBool ? 'SEARCH RESULT' : 'IMDB TOP-250';
    },
    selectedMovie() {
      return this.selectedMovieId ? this.list[this.selectedMovieId] : {};
    },
  },
  methods: {
    ...mapActions('moviesStore', [ 'removeMovie' ]),
    ...mapActions([ 'showNotify' ]),
    onMouseOver(poster) {
      this.$emit('changePoster', poster);
    },
    async onRemoveItem({
      id,
      title,
    }) {
      const isConfirmed = await this.$bvModal.msgBoxConfirm(`Are you sure delete ${ title }?`);
      if(isConfirmed) {
        this.removeMovie(id);
        this.showNotify({
          msg: 'Movie deleted successful',
          variant: 'success',
          title: 'Success',
        });
      }
    },
    onShowMovieInfo(id) {
      this.selectedMovieId = id;
      this.$bvModal.show(this.movieInfoModalId);
    },
    onCloseModal() {
      this.selectedMovieId = '';
      this.$bvModal.hide(this.movieInfoModalId);
    },
  },
};
</script>

<style scoped>
.list-title {
  font-size: 40px;
  margin-bottom: 30px;
  color: white;
}
</style>

<style>
.movie-modal-body {
  padding: 0 !important;
}
.movie-modal-content {
  border: none !important;
}
</style>
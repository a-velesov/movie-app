<template>
  <BContainer>
    <h3 class="list-title">{{ listTitle }}</h3>
    <BRow>
      <template>
        <BCol cols="3" v-for="(movie, key) in list" :key="key">
          <MovieItem :movie="movie" @mouseover.native="onMouseOver(movie.Poster)" @removeItem="onRemoveItem" />
        </BCol>
      </template>
    </BRow>
  </BContainer>
</template>

<script>
  import MovieItem from '@/components/MovieItem';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'MoviesList',
    components: { MovieItem },
    props: {
      list: {
        type: Object,
        default: () => ({}),
      },
    },
    computed: {
      ...mapGetters('moviesStore', ['isSearchBool']),
      listTitle() {
        console.log(this.isSearchBool, 'this.isSearch');
      return this.isSearchBool ? 'SEARCH RESULT' : 'IMDB TOP-250';
      },
    },
    methods: {
      ...mapActions('moviesStore', [ 'removeMovie' ]),
      ...mapActions(['showNotify']),
      onMouseOver(poster) {
        this.$emit('changePoster', poster);
      },
      async onRemoveItem({ id, title }) {
        const isConfirmed = await this.$bvModal.msgBoxConfirm(`Are you sure delete ${ title }?`);
        if(isConfirmed) {
          this.removeMovie(id);
          this.showNotify({
            msg: 'Movie deleted successful',
            variant: 'success',
            title: 'Success'
          })
        }
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
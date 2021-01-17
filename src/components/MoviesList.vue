<template>
  <BContainer>
    <h3 class="list-title">IMDB TOP-250</h3>
    <BRow>
      <template>
        <BCol cols="3" v-for="(movie, key) in list" :key="key">
          <MovieItem :movie="movie" @mouseover.native="onMouseOver(movie.Poster)" />
        </BCol>
      </template>
    </BRow>
  </BContainer>
</template>

<script>
  import MovieItem from '@/components/MovieItem';

  export default {
    name: 'MoviesList',
    components: { MovieItem },
    props: {
      list: {
        type: Object,
        default: () => ({}),
      },
    },
    methods: {
      onMouseOver(poster) {
        this.$emit('changePoster', poster);
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
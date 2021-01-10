<template>
  <BContainer>
    <h3 class="list-title">IMDB TOP-250</h3>
    <BRow>
      <template v-if="isExist">
      <BCol cols="3" v-for="(movie, key) in list" :key="key">
      <MovieItem :movie="movie" />
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
        default: () => ({})
      }
    },
    computed: {
      isExist() {
        return Boolean(Object.keys(this.list).length);
      }
    },
  };
</script>

<style scoped>
.list-title {
  font-size: 40px;
  margin-bottom: 30px;
}
</style>
<template>
  <div class="poster-page-bg" :style="posterStyle" />
</template>

<script>
export default {
  name: 'PosterBg',
  props: {
    poster: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    defaultPosterBg: 'linear-gradient(180deg, rgb(78, 7, 47) 0%, rgb(57, 0, 100) 92%)',
  }),
  computed: {
    posterStyle() {
      return {
        'background-image': this.posterBg,
      };
    },
    posterBg() {
      return this.poster ? `url(${ this.poster })` : this.defaultPosterBg;
    },
  },
};
</script>

<style scoped>
.poster-page-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  transition: all 0.2s ease;
  background-size: 50%;
  filter: blur(5px);
}

.poster-page-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.5;
  background-image: linear-gradient(
      45deg,
      rgb(0, 3, 38) 0%,
      rgb(82, 15, 117) 100%
  );
}
</style>
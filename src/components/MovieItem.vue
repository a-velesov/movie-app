<template>
  <div class="movie-item mb-3">
    <div class="movie-item__poster" :style="posterBg" />
    <div class="movie-item__info-container">
      <div class="movie-item__info">
        <h3 class="movie-item__info-title">{{ movie.Title }}</h3>
        <span class="movie-item__info-year">{{ movie.Year }}</span>
      </div>
      <div class="movie-item__controls row no-gutters">
        <div class="col pl-2">
          <BButton size="md" block variant="outline-light">
            Edit
          </BButton>
        </div>
        <div class="col pl-2">
          <BButton size="md" block variant="outline-light">
            Remove
          </BButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MovieItem',
    props: {
      movie: {
        type: Object,
        required: true,
      },
    },
    computed: {
      posterBg() {
        return {
          'background-image': `url(${ this.movie.Poster })`,
        };
      },
    },
  };
</script>

<style scoped>
  .movie-item {
    position: relative;
    cursor: pointer;
    border-radius: 5px;
    overflow: hidden;
    transition: all 0.2s ease;
    height: 400px;
  }
  
  .movie-item:hover {
    box-shadow: 0 5px 30px rgba(0, 0, 0, .7);
    transform: scale(1.02);
  }
  
  .movie-item__poster {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    z-index: -1;
  }
  .movie-item__info-container {
    padding: 20px 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    opacity: 0;
    transition: all 0.2s ease;
  }
  
  .movie-item__info-title {
    font-size: 18px;
    color: white;
  }

  .movie-item__info-year {
    font-size: 14px;
    color: white;
  }
  
  .movie-item:hover .movie-item__info-container {
    opacity: 1;
    background-color: rgba(0, 0, 0, .7);
  }
  
</style>
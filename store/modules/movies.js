import axios from '@/plugins/axios';
import IDs from './../mock/imdb_top250';
import mutations from '../mutations';

function serializeResponse(movies) {
  return movies.reduce((acc, movie) => {
    acc[movie.imdbID] = movie;
    return acc;
  }, {});
}

const { MOVIES, CURRENT_PAGE, REMOVE_MOVIE } = mutations;

const moviesStore = {
  namespaced: true,
  state: {
    top250: IDs,
    moviesPerPage: 8,
    currentPage: 1,
    movies: {},
  },
  getters: {
    moviesList: ({ movies }) => movies,
    slicedId: ({ top250 }) => (from, to) => top250.slice(from, to),
    currentPage: ({ currentPage }) => currentPage,
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    moviesLength: ({ top250 }) => Object.keys(top250).length,
  },
  mutations: {
    [MOVIES](state, value) {
      state.movies = value;
    },
    [CURRENT_PAGE](state, value) {
      state.currentPage = value;
    },
    [REMOVE_MOVIE](state, index) {
      state.top250.splice(index, 1);
    },
  },
  actions: {
    initMoviesStore: {
      handler({ dispatch }) {
        dispatch('fetchMovies');
      },
      root: true,
    },
    async fetchMovies({ getters, commit, dispatch }) {
      try {
        dispatch('toggleLoader', true, { root: true });
        const { currentPage, moviesPerPage, slicedId } = getters;
        const from = (currentPage * moviesPerPage) - moviesPerPage;
        const to = currentPage * moviesPerPage;
        const moviesToFetch = slicedId(from, to);
        const request = moviesToFetch.map((id) => axios.get(`/?i=${ id }`));
        const response = await Promise.all(request);
        const movies = serializeResponse(response);
        commit(MOVIES, movies);
      } catch(e) {
        console.log(e);
      } finally {
        dispatch('toggleLoader', false, { root: true });
      }
    },
    changeCurrentPage({ commit, dispatch }, page) {
      commit(CURRENT_PAGE, page);
      dispatch('fetchMovies');
    },
    removeMovie({ commit, dispatch, state }, id) {
      const index = state.top250.findIndex(item => item === id);
      if(index !== -1) {
        commit(REMOVE_MOVIE, index);
        dispatch('fetchMovies');
      }
    },
  },
};

export default moviesStore;
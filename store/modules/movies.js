import axios from '@/plugins/axios';
import IDs from './../mock/imdb_top250';
import mutations from '../mutations';

function serializeResponse(movies) {
  return movies.reduce((acc, movie) => {
    acc[movie.imdbID] = movie;
    return acc;
  }, {});
}

const { MOVIES, CURRENT_PAGE } = mutations;

const moviesStore = {
  namespaced: true,
  state: {
    top250: IDs,
    moviesPerPage: 4,
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
  },
  actions: {
    initMoviesStore: {
      handler({ dispatch }) {
        dispatch('fetchMovies');
      },
      root: true,
    },
    async fetchMovies({ getters, commit }) {
      try {
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
      }
    },
    changeCurrentPage({ commit, dispatch }, page) {
      commit(CURRENT_PAGE, page);
      dispatch('fetchMovies');
    },
  },
};

export default moviesStore;
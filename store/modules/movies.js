import axios from '@/plugins/axios';
import IDs from './../mock/imdb_top250';
import mutations from '../mutations';

function serializeResponse(movies) {
  return movies.reduce((acc, movie) => {
    acc[movie.imdbID] = movie;
    return acc;
  }, {});
}

const { MOVIES } = mutations;

const moviesStore = {
  namespaced: true,
  state: {
    top250: IDs,
    moviesPerPage: 4,
    currentPage: 1,
    movies: {},
  },
  getters: {
    slicedId: ({ top250 }) => (from, to) => top250.slice(from, to),
    currentPage: ({ currentPage }) => currentPage,
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
  },
  mutations: {
    [MOVIES](state, value) {
      console.log(state, 'state');
      console.log(value, 'value');
      state.movies = value;
    }
  },
  actions: {
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
  },
};

export default moviesStore;
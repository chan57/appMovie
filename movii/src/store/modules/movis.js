import axios from '@/plugin/axios'
import IDs from '@/store/mock/imdbTop'
import mutations from '../mutations'

function serializeResponse(movi){
  return movi.reduce((acc, mov) => {
    acc[mov.imdbID] = mov
    return acc
  }, {})
}

const { MOVIES } = mutations

const moviesStore = {
  namespaced: true,
  state: {
    topIMDB: IDs,
    movieInPage:12,
    curentPage:1,
    movies: {}
  },
  getters: {
    slicedId :({ topIMDB }) => (from, to) => topIMDB.slice(from, to),
    curentPage: ({curentPage}) => curentPage,
    movieInPage: ({ movieInPage }) => movieInPage
  },
  mutations:{
    [MOVIES](state, value){
      state.movies = value
    }
  },
  actions: {
   async fetchMovies({ getters, commit }){
      try{
        const { curentPage, movieInPage, slicedId } = getters;
        const from = curentPage * movieInPage - movieInPage;
        const to  = curentPage * movieInPage;
        const moviFetch = slicedId(from, to);
        const request = moviFetch.map(id => axios.get(`/?i=${id}`))
        const response = await Promise.all(request)
        const movis = serializeResponse(response)

        commit(MOVIES, movis)
      }catch(err){
        console.log(err)
      }

    }
  }
};

export default moviesStore;
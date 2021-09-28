import React from 'react';
// import { API, graphqlOperation } from 'aws-amplify';
// import { listJobCategories as GET_CATEGORIES, listMovies as GET_MOVIES, getMovie as GET_MOVIE_BY_ID} from '../graphql/queries';
// import { listMovies as GET_MOVIES, getMovie as GET_MOVIE_BY_ID} from '../graphql/queries';

import {
  Actor,
  HttpAgent
} from '@dfinity/agent';

const idlFactory = ({ IDL }) => {
  return IDL.Service({
      graphql_query: IDL.Func([IDL.Text, IDL.Text], [IDL.Text], ['query']),
      graphql_mutation: IDL.Func([IDL.Text, IDL.Text], [IDL.Text], [])
  });
};

const agent = new HttpAgent();

const actor = Actor.createActor(idlFactory, {
  agent,
  // canisterId: 'rdmx6-jaaaa-aaaaa-aaadq-cai' ? 'sdhmb-viaaa-aaaai-aar5a-cai'
  canisterId: 'sdhmb-viaaa-aaaai-aar5a-cai'
});



async function getMovies() {
  const result = await actor.graphql_query(`
    query {
      readMovie {
        id,
        legacy_id,
        original_language,
        original_title,
        overview,
        popularity,
        release_date,
        title,
        tags(limit: 5) {name},
        vote_average,
        vote_count,
        directors(limit: 5) {name},
        cast(limit: 5) {name}
        }
      }
  `, JSON.stringify({}));

  const resultJSON = JSON.parse(result);
  const movies = resultJSON.data.readMovie;


  return movies;
}

export const MoviesContext = React.createContext();

import {
  listNFTs,
  listMyNFTs,
} from "../utils/index";

const initialValue = {
  movies: [],
  my_movies: [],
  movie_data: {},
  loading: true,
  error: '',
};

const reducer = (value, action) => {
  switch (action.type) {
    case 'LOADING_SUCCESS':
      return {
        ...value,
        loading: false,
      };
    case 'RESETTING_MOVIE_SUCCESS':
      return {
        ...value,
        MOVIE: {},
      };
    case 'GET_MOVIES_SUCCESS':
      return {
        ...value,
        movies: action.payload,
      };
    case 'GET_MOVIES_ERROR':
      return {
        ...value,
        movies: [],
        error: action.payload,
      };
    case 'GET_MY_MOVIES_SUCCESS':
      return {
        ...value,
        my_movies: action.payload,
      };
    case 'GET_MY_MOVIES_ERROR':
      return {
        ...value,
        my_movies: [],
        error: action.payload,
      };
    case 'GET_MOVIE_SUCCESS':
      return {
        ...value,
        movie_data: action.payload,
      };
    case 'GET_MOVIE_ERROR':
      return {
        ...value,
        movie_data: {},
        error: action.payload,
      };
    default:
      return value;
  }
};

const MovieContextProvider = ({ children }) => {
  const [value, dispatch] = React.useReducer(reducer, initialValue);

  const getMovieCategoryRequest = async () => {
    // const result = await API.graphql(graphqlOperation(GET_CATEGORIES));

    // if (result.data.listJobCategories.items && result.data.listJobCategories.items.length) {
    //   dispatch({ type: 'GET_CATEGORY_SUCCESS', payload: result.data.listJobCategories.items });
    // } else {
    //   dispatch({ type: 'GET_CATEGORY_ERROR', payload: result.error });
    // }
  };
  const getMoviesRequest = async () => {
    const data = await listNFTs();
    const movieIds = data.map(x => parseInt(x[1].properties.internal_id));
    console.log("CALL 1");

    // const movieData = require("../mockup");
    const movieData = await getMovies();
    const movieData1 = movieData.filter(movie => movieIds.includes(movie.legacy_id));
    
    if (movieData1 && movieData1.length) {
      dispatch({ type: 'GET_MOVIES_SUCCESS', payload: movieData1 });
    } else {
      dispatch({ type: 'GET_MOVIES_ERROR', payload: movieData1 });
    }
  };

  const getMyMoviesRequest = async () => {
    const data = await listMyNFTs();
    const movieIds = data.map(x => parseInt(x[1].properties.internal_id));
    console.log("CALL 2", data, movieIds);

    // const movieData = require("../mockup");
    const movieData = await getMovies();
    const movieData1 = movieData.filter(movie => movieIds.includes(movie.legacy_id));

    if (movieData1 && movieData1.length) {
      dispatch({ type: 'GET_MY_MOVIES_SUCCESS', payload: movieData1 });
    } else {
      dispatch({ type: 'GET_MY_MOVIES_ERROR', payload: movieData1 });
    }
  };
  
  const getMovieByIdRequest = async (id) => {
    // const movieData = require("../mockup");
    const movieData = await getMovies();
    const movieData1 = movieData.filter(movie => movie.legacy_id == id);

    const data = await listNFTs();
    console.log("CALL 3");
    const nfts = data.filter(nft => parseInt(nft[1].properties.internal_id) == id);
    
    const data2 = await listMyNFTs();
    const nfts2 = data2.filter(nft => parseInt(nft[1].properties.internal_id) == id);
    
    if (movieData1 && movieData1.length) {
      dispatch({ type: 'GET_MOVIE_SUCCESS', payload: {nfts: nfts, my_nfts: nfts2, ...movieData1[0]}});
    } else {
      dispatch({ type: 'GET_MOVIE_ERROR', payload: movieData1 });
    }
    // const result = await API.graphql(graphqlOperation(GET_MOVIE_BY_ID, inputVariables));
    
    // if (result.data && result.data.getJob.id) {
    //   dispatch({ type: 'GET_MOVIE_SUCCESS', payload: result.data.getJob });
    // } else {
    //   dispatch({ type: 'GET_MOVIE_ERROR', payload: result.error });
    // }
  };

  React.useEffect(() => {
    getMovieCategoryRequest();
    getMoviesRequest();
    // console.log('DB CALL');
  }, []);

  return (
    <MoviesContext.Provider
      value={{ ...value, dispatch, getMovieCategoryRequest, getMoviesRequest, getMyMoviesRequest, getMovieByIdRequest }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MovieContextProvider;

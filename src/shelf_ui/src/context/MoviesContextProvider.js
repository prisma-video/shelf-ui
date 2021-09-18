import React from 'react';
// import { API, graphqlOperation } from 'aws-amplify';
// import { listJobCategories as GET_CATEGORIES, listMovies as GET_MOVIES, getMovie as GET_MOVIE_BY_ID} from '../graphql/queries';
// import { listMovies as GET_MOVIES, getMovie as GET_MOVIE_BY_ID} from '../graphql/queries';

export const MoviesContext = React.createContext();

import {
  listNFTs,
  listMyNFTs,
} from "../utils/index";

const initialValue = {
  movies: [],
  my_movies: [],
  movie: {},
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
    const movieIds = data.map(x => x[1].properties.internal_id);
    console.log("CALL 1", data[1][1]);
    console.log("CALL 1.1", movieIds);

    const movieData = await fetch("../DB/mockup.json")
      .then(response => response.json())
      .filter(({id}) => movieIds.includes(id));
    console.log("CALL 1.2", movieData);
        
    if (data && data.length) {
      dispatch({ type: 'GET_MOVIES_SUCCESS', payload: data });
    } else {
      dispatch({ type: 'GET_MOVIES_ERROR', payload: data });
    }
  };

  const getMyMoviesRequest = async () => {
    const data = await listMyNFTs();
    console.log("CALL 2");
    if (data && data.length) {
      dispatch({ type: 'GET_MY_MOVIES_SUCCESS', payload: data });
    } else {
      dispatch({ type: 'GET_MY_MOVIES_ERROR', payload: data });
    }
  };
  
  // const getMovieByIdRequest = async (inputVariables) => {
  //   // const result = await API.graphql(graphqlOperation(GET_MOVIE_BY_ID, inputVariables));
    
  //   // if (result.data && result.data.getJob.id) {
  //   //   dispatch({ type: 'GET_MOVIE_SUCCESS', payload: result.data.getJob });
  //   // } else {
  //   //   dispatch({ type: 'GET_MOVIE_ERROR', payload: result.error });
  //   // }
  // };

  React.useEffect(() => {
    getMovieCategoryRequest();
    getMoviesRequest();
    console.log('DB CALL');
  }, []);

  return (
    <MoviesContext.Provider
      value={{ ...value, dispatch, getMovieCategoryRequest, getMoviesRequest, getMyMoviesRequest }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MovieContextProvider;

import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
// import { listJobCategories as GET_CATEGORIES, listMovies as GET_MOVIES, getMovie as GET_MOVIE_BY_ID} from '../graphql/queries';
import { listMovies as GET_MOVIES, getMovie as GET_MOVIE_BY_ID} from '../graphql/queries';

export const MoviesContext = React.createContext();

const initialValue = {
  categories: [],
  movies: [],
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
    case 'GET_CATEGORY_SUCCESS':
      return {
        ...value,
        categories: action.payload,
      };
    case 'GET_CATEGORY_ERROR':
      return {
        ...value,
        categories: [],
        error: action.payload,
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
    case 'GET_MOVIE_SUCCESS':
      return {
        ...value,
        MOVIE: action.payload,
      };
    case 'GET_MOVIE_ERROR':
      return {
        ...value,
        MOVIE: {},
        error: action.payload,
      };
    default:
      return value;
  }
};

const JobsContextProvider = ({ children }) => {
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
    const result = await API.graphql(graphqlOperation(GET_MOVIES));

    if (result.data.listMovies.items && result.data.listMovies.items.length) {
      dispatch({ type: 'GET_MOVIES_SUCCESS', payload: result.data.listMovies.items });
    } else {
      dispatch({ type: 'GET_MOVIES_ERROR', payload: result.error });
    }
  };
  const getMovieByIdRequest = async (inputVariables) => {
    const result = await API.graphql(graphqlOperation(GET_MOVIE_BY_ID, inputVariables));
    
    if (result.data && result.data.getJob.id) {
      dispatch({ type: 'GET_MOVIE_SUCCESS', payload: result.data.getJob });
    } else {
      dispatch({ type: 'GET_MOVIE_ERROR', payload: result.error });
    }
  };

  React.useEffect(() => {
    getMovieCategoryRequest();
    getMoviesRequest();
    console.log('DB CALL');
  }, []);

  return (
    <MoviesContext.Provider
      value={{ ...value, dispatch, getMovieCategoryRequest, getMoviesRequest, getMovieByIdRequest }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default JobsContextProvider;

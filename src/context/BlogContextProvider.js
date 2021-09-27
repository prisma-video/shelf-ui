import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listBlogPosts as GET_POSTS, getBlogPost as GET_POST_BY_ID} from '../graphql/queries';
import { createBlogPost as POST_POST_WITHOUT_ID, updateBlogPost as UPDATE_POST, deleteBlogPost as DELETE_POST} from '../graphql/mutations';

export const BlogContext = React.createContext();

const initialValue = {
  posts: [],
  post: {},
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
    case 'RESETTING_POST_SUCCESS':
      return {
        ...value,
        post: {},
      };
    case 'GET_POSTS_SUCCESS':
      return {
        ...value,
        posts: action.payload,
      };
    case 'GET_POSTS_ERROR':
      return {
        ...value,
        posts: [],
        error: action.payload,
      };
    case 'GET_POST_SUCCESS':
      return {
        ...value,
        post: action.payload,
      };
    case 'GET_POST_ERROR':
      return {
        ...value,
        post: {},
        error: action.payload,
      };
    case 'POST_POST_SUCCESS':
      return {
        ...value,
        post: {},
      };
    case 'POST_POST_ERROR':
      return {
        ...value,
        post: {},
        error: action.payload,
      };
    case 'UPDATE_POST_SUCCESS':
      return {
        ...value,
        post: {},
      };
    case 'UPDATE_POST_ERROR':
      return {
        ...value,
        post: {},
        error: action.payload,
      };
    case 'DELETE_POST_SUCCESS':
      return {
        ...value,
        post: {},
      };
    case 'DELETE_POST_ERROR':
      return {
        ...value,
        post: {},
        error: action.payload,
      };
    default:
      return value;
  }
};

const BlogContextProvider = ({ children }) => {
  const [value, dispatch] = React.useReducer(reducer, initialValue);

  const getPostsRequest = async () => {
    const result = await API.graphql(graphqlOperation(GET_POSTS));

    if (result.data.listBlogPosts.items && result.data.listBlogPosts.items.length) {
      dispatch({ type: 'GET_POSTS_SUCCESS', payload: result.data.listBlogPosts.items });
    } else {
      dispatch({ type: 'GET_POSTS_ERROR', payload: result.error });
    }
  };
  const getPostByIdRequest = async (inputVariables) => {
    const result = await API.graphql(graphqlOperation(GET_POST_BY_ID, inputVariables));
    
    if (result.data && result.data.getBlogPost.id) {
      dispatch({ type: 'GET_POST_SUCCESS', payload: result.data.getBlogPost });
    } else {
      dispatch({ type: 'GET_POST_ERROR', payload: result.error });
    }
  };
  const postNewPostRequest = async (inputVariables) => {
    const result = await API.graphql(graphqlOperation(POST_POST_WITHOUT_ID, {input: inputVariables}));

    if (!result.error) {
      dispatch({ type: 'POST_POST_SUCCESS', payload: result.data });
      getPostsRequest();
    } else {
      dispatch({ type: 'POST_POST_ERROR', payload: result.error });
    }
  };
  
  const updatePostRequest = async (inputVariables) => {
    const result = await API.graphql(graphqlOperation(UPDATE_POST, {input: inputVariables}));
    
    if (!result.error) {
      dispatch({ type: 'UPDATE_POST_SUCCESS', payload: result });
      getPostsRequest();
    } else {
      dispatch({ type: 'UPDATE_POST_ERROR', payload: result.error });
    }
  };

  const deletePostRequest = async () => {

    const result = await API.graphql(graphqlOperation(DELETE_POST, {input: {id: value.post.id}}));

    if (!result.error) {
      dispatch({ type: 'DELETE_POST_SUCCESS', payload: result });
      getPostsRequest();
    } else {
      dispatch({ type: 'DELETE_POST_ERROR', payload: result.error });
    }
  };

  React.useEffect(() => {
    getPostsRequest();
    // console.log('DB CALL');
  }, []);

  return (
    <BlogContext.Provider
      value={{ ...value, dispatch, getPostsRequest, getPostByIdRequest, postNewPostRequest, updatePostRequest, deletePostRequest }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;

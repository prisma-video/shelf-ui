import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listJobCategories as GET_CATEGORIES, listJobs as GET_JOBS, getJob as GET_JOB_BY_ID} from '../graphql/queries';
import { createJob as POST_JOB_WITHOUT_ID, updateJob as UPDATE_JOB, deleteJob as DELETE_JOB} from '../graphql/mutations';

export const JobsContext = React.createContext();

const initialValue = {
  categories: [],
  jobs: [],
  job: {},
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
    case 'RESETTING_JOB_SUCCESS':
      return {
        ...value,
        job: {},
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
    case 'GET_JOBS_SUCCESS':
      return {
        ...value,
        jobs: action.payload,
      };
    case 'GET_JOBS_ERROR':
      return {
        ...value,
        jobs: [],
        error: action.payload,
      };
      case 'GET_JOB_SUCCESS':
        return {
          ...value,
          job: action.payload,
        };
      case 'GET_JOB_ERROR':
        return {
          ...value,
          job: {},
          error: action.payload,
        };
    case 'POST_JOB_SUCCESS':
      return {
        ...value,
        job: {},
      };
    case 'POST_JOB_ERROR':
      return {
        ...value,
        job: {},
        error: action.payload,
      };
    case 'UPDATE_JOB_SUCCESS':
      return {
        ...value,
        job: {},
      };
    case 'UPDATE_JOB_ERROR':
      return {
        ...value,
        job: {},
        error: action.payload,
      };
    case 'DELETE_JOB_SUCCESS':
      return {
        ...value,
        job: {},
      };
    case 'DELETE_JOB_ERROR':
      return {
        ...value,
        job: {},
        error: action.payload,
      };
    default:
      return value;
  }
};

const JobsContextProvider = ({ children }) => {
  const [value, dispatch] = React.useReducer(reducer, initialValue);

  const getJobCategoryRequest = async () => {
    const result = await API.graphql(graphqlOperation(GET_CATEGORIES));

    if (result.data.listJobCategories.items && result.data.listJobCategories.items.length) {
      dispatch({ type: 'GET_CATEGORY_SUCCESS', payload: result.data.listJobCategories.items });
    } else {
      dispatch({ type: 'GET_CATEGORY_ERROR', payload: result.error });
    }
  };
  const getJobsRequest = async () => {
    const result = await API.graphql(graphqlOperation(GET_JOBS));

    if (result.data.listJobs.items && result.data.listJobs.items.length) {
      dispatch({ type: 'GET_JOBS_SUCCESS', payload: result.data.listJobs.items });
    } else {
      dispatch({ type: 'GET_JOBS_ERROR', payload: result.error });
    }
  };
  const getJobByIdRequest = async (inputVariables) => {
    const result = await API.graphql(graphqlOperation(GET_JOB_BY_ID, inputVariables));
    
    if (result.data && result.data.getJob.id) {
      dispatch({ type: 'GET_JOB_SUCCESS', payload: result.data.getJob });
    } else {
      dispatch({ type: 'GET_JOB_ERROR', payload: result.error });
    }
  };
  const postNewJobRequest = async (inputVariables) => {
    const result = await API.graphql(graphqlOperation(POST_JOB_WITHOUT_ID, {input: inputVariables}));

    if (!result.error) {
      dispatch({ type: 'POST_JOB_SUCCESS', payload: result.data });
      getJobsRequest();
    } else {
      dispatch({ type: 'POST_JOB_ERROR', payload: result.error });
    }
  };
  
  const updateJobRequest = async (inputVariables) => {
    const result = await API.graphql(graphqlOperation(UPDATE_JOB, {input: inputVariables}));
    
    if (!result.error) {
      dispatch({ type: 'UPDATE_JOB_SUCCESS', payload: result });
      getJobsRequest();
    } else {
      dispatch({ type: 'UPDATE_JOB_ERROR', payload: result.error });
    }
  };

  const deleteJobRequest = async () => {

    const result = await API.graphql(graphqlOperation(DELETE_JOB, {input: {id: value.job.id}}));

    if (!result.error) {
      dispatch({ type: 'DELETE_JOB_SUCCESS', payload: result });
      getJobsRequest();
    } else {
      dispatch({ type: 'DELETE_JOB_ERROR', payload: result.error });
    }
  };

  React.useEffect(() => {
    getJobCategoryRequest();
    getJobsRequest();
    console.log('DB CALL');
  }, []);

  return (
    <JobsContext.Provider
      value={{ ...value, dispatch, getJobCategoryRequest, getJobsRequest, getJobByIdRequest, postNewJobRequest, updateJobRequest, deleteJobRequest }}
    >
      {children}
    </JobsContext.Provider>
  );
};

export default JobsContextProvider;

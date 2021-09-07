import React from 'react';
import AuthContextProvider from './AuthContextProvider';
import AwsContextProvider from './AwsContextProvider';
// import JobsContextProvider from './JobsContextProvider';
// import BlogContextProvider from './BlogContextProvider';

const GlobalContext = ({ children }) => {
  return (

    <AuthContextProvider>
      <AwsContextProvider>
        {/* <JobsContextProvider>
          <BlogContextProvider> */}
            {children}
          {/* </BlogContextProvider>
        </JobsContextProvider> */}
      </AwsContextProvider>
    </AuthContextProvider>
  );
};

export default GlobalContext;

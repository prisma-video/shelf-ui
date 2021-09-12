import React from 'react';
import AuthContextProvider from './AuthContextProvider';
import AwsContextProvider from './AwsContextProvider';
import MoviesContextProvider from './MoviesContextProvider';
// import BlogContextProvider from './BlogContextProvider';

const GlobalContext = ({ children }) => {
  return (

    <AuthContextProvider>
      <AwsContextProvider>
        <MoviesContextProvider>
          {/* <BlogContextProvider> */}
            {children}
          {/* </BlogContextProvider> */}
        </MoviesContextProvider>
      </AwsContextProvider>
    </AuthContextProvider>
  );
};

export default GlobalContext;

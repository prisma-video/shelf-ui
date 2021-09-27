import React from 'react';
// import AuthContextProvider from './AuthContextProvider';
// import AwsContextProvider from './AwsContextProvider';
import MovieContextProvider from './MoviesContextProvider';
// import BlogContextProvider from './BlogContextProvider';

import { DfinityAuth } from "./DfinityContextProvider";

const GlobalContext = ({ children }) => {
  return (
    <DfinityAuth>
      {/* <AuthContextProvider>
        <AwsContextProvider> */}
          <MovieContextProvider>
            {/* <BlogContextProvider> */}
              {children}
            {/* </BlogContextProvider> */}
          </MovieContextProvider>
        {/* </AwsContextProvider>
      </AuthContextProvider> */}
    </DfinityAuth>
  );
};

export default GlobalContext;

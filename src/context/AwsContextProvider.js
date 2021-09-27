import React, { useState } from 'react';

export const AwsContext = React.createContext();

export const AwsContextProvider = (props) => {
  const [awsClient, setAwsClient] = useState(null);

  return (
    <AwsContext.Provider
      value={{
        awsClient,
        setAwsClient,
      }}
    >
      {props.children}
    </AwsContext.Provider>
  );
};


export default AwsContextProvider;
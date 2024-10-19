import React from 'react';
import { useQuery } from '@apollo/client';

const QueryWrapper = ({ query, variables, children, skip = false }) => {
  const { loading, error, data } = useQuery(query, { variables, skip });

  return children({
    loading,
    error,
    data,
  });
};

export default QueryWrapper;

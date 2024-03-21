import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const BasicPagination = ({ currentPage, onPageChange }) => {
  return (
    <Stack spacing={2} style={{ padding: "1rem 0rem", background: 'rgb(255, 251, 241)' }}>
      <Pagination count={10} page={currentPage} onChange={onPageChange} />
    </Stack>
  );
};

export default BasicPagination;

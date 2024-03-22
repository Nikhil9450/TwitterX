import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const BasicPagination = ({ currentPage, onPageChange, totalResults, perPage }) => {
  const totalPages = Math.ceil(totalResults / perPage);

  return (
    <Stack
      spacing={2}
      sx={{
        padding: '1rem 0rem',
        background: '#f2f2f2', // Grey background
        display: 'flex',
        justifyContent: 'center', // Center pagination horizontally
        alignItems: 'center', // Center pagination vertically
        borderRadius: '8px', // Optional: adds rounded corners
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', // Optional: adds a shadow
      }}
    >
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        sx={{
          '& .MuiPaginationItem-root': {
            color: 'black', // Black text color
          },
          '& .MuiPaginationItem-page.Mui-selected': {
            backgroundColor: '#494949', // Black background color for selected page
            color: 'white', // White text color for selected page
          },
        }}
      />
    </Stack>
  );
};

export default BasicPagination;

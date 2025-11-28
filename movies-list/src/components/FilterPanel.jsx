import React from 'react';
import { 
  Box, 
  Button, 
  Container 
} from '@mui/material';

const FilterPanel = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'Все фильмы' },
    { key: 'favorites', label: 'Только избранные' }
  ];

  return (
    <Box 
      sx={{ 
        bgcolor: '#1a1a1a',
        borderBottom: '1px solid #2d2d2d',
        position: 'sticky',
        top: { xs: 56, sm: 64 },
        zIndex: 999
      }}
    >
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            bgcolor: '#2d2d2d',
            borderRadius: 2,
            p: 0.5,
            maxWidth: 400,
            mx: 'auto'
          }}
        >
          {filters.map(filter => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? "contained" : "text"}
              onClick={() => onFilterChange(filter.key)}
              sx={{
                flex: 1,
                bgcolor: activeFilter === filter.key ? '#8B0000' : 'transparent',
                color: activeFilter === filter.key ? 'white' : '#b3b3b3',
                px: 3,
                '&:hover': {
                  bgcolor: activeFilter === filter.key ? '#700000' : 'rgba(255, 255, 255, 0.05)',
                  color: 'white'
                }
              }}
            >
              {filter.label}
            </Button>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FilterPanel;
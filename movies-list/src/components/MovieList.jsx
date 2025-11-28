import React from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Card,
  CardContent
} from '@mui/material';
import MovieCard from './MovieCard';
import AddIcon from '@mui/icons-material/Add';

const MovieList = ({ 
  movies, 
  onToggleFavorite, 
  onEditMovie, 
  onDeleteMovie, 
  activeFilter,
  onAddMovieClick 
}) => {
  const getListTitle = () => {
    if (activeFilter === 'favorites') {
      return `Избранные фильмы (${movies.length})`;
    }
    return `Все фильмы (${movies.length})`;
  };

  if (movies.length === 0) {
    const emptyMessage = activeFilter === 'favorites' 
      ? "Нет избранных фильмов. Добавьте фильмы в избранное, чтобы они появились здесь!"
      : "Фильмов пока нет. Добавьте первый фильм!";

    return (
      <Box sx={{ mt: 3 }}>
        <Typography 
          variant="h5" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ 
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 40,
              height: 2,
              bgcolor: 'primary.main',
            }
          }}
        >
          {getListTitle()}
        </Typography>
        
        <Card sx={{ mt: 3, p: 4, textAlign: 'center' }}>
          <CardContent>
            <Typography color="textSecondary" sx={{ mb: 3 }}>
              {emptyMessage}
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onAddMovieClick}
              sx={{
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark'
                }
              }}
            >
              Добавить фильм
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography 
        variant="h5" 
        component="h2" 
        align="center" 
        gutterBottom
        sx={{ 
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 40,
            height: 2,
            bgcolor: 'primary.main',
          }
        }}
      >
        {getListTitle()}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddMovieClick}
          sx={{
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark'
            }
          }}
        >
          Добавить фильм
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onToggleFavorite={onToggleFavorite}
            onEditMovie={onEditMovie}
            onDeleteMovie={onDeleteMovie}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MovieList;
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Collapse,
  IconButton
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import EditMovieForm from './EditMovieForm';

const MovieCard = ({ movie, onToggleFavorite, onEditMovie, onDeleteMovie }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSave = (updatedMovie) => {
    onEditMovie(updatedMovie);
    setIsEditing(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Определяем, нужно ли обрезать текст
  const maxLength = 150;
  const needsTruncation = movie.impression && movie.impression.length > maxLength;
  const displayText = isExpanded 
    ? movie.impression 
    : (needsTruncation ? movie.impression.slice(0, maxLength) + '...' : movie.impression);

  if (isEditing) {
    return (
      <EditMovieForm 
        movie={movie} 
        onSave={handleSave} 
        onCancel={() => setIsEditing(false)} 
      />
    );
  }

  return (
    <Card 
      variant="outlined"
      sx={{
        borderLeft: '4px solid',
        borderLeftColor: movie.isFavorite ? 'secondary.main' : 'grey.400',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 2
        }
      }}
    >
      <CardContent>
        {/* Заголовок и жанр */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 500 }}>
              {movie.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ bgcolor: 'grey.100', px: 1, borderRadius: 1 }}>
              ({movie.year})
            </Typography>
            {movie.isFavorite && (
              <Chip 
                label="Избранное" 
                size="small" 
                color="secondary"
                sx={{ fontSize: '0.7rem' }}
              />
            )}
          </Box>
          
          <Chip 
            label={movie.genre} 
            size="small" 
            variant="filled"
            sx={{ 
              bgcolor: 'primary.main', 
              color: 'white',
              fontSize: '0.75rem'
            }}
          />
        </Box>

        {/* Впечатление */}
        {movie.impression && (
          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                lineHeight: 1.6,
                mb: needsTruncation ? 1 : 0
              }}
            >
              {displayText}
            </Typography>
            
            {needsTruncation && (
              <Button
                size="small"
                endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                onClick={toggleExpanded}
                sx={{ 
                  color: 'primary.main',
                  fontSize: '0.8rem'
                }}
              >
                {isExpanded ? 'Свернуть' : 'Показать полностью'}
              </Button>
            )}
          </Box>
        )}

        {/* Кнопки действий */}
        <Box sx={{ 
          display: 'flex', 
          gap: 1, 
          justifyContent: 'flex-end', 
          pt: 2, 
          borderTop: 1, 
          borderColor: 'grey.200' 
        }}>
          <IconButton
            size="small"
            onClick={() => onToggleFavorite(movie.id)}
            color={movie.isFavorite ? "secondary" : "default"}
          >
            {movie.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          
          <Button
            size="small"
            startIcon={<EditIcon />}
            onClick={() => setIsEditing(true)}
            variant="outlined"
          >
            Редактировать
          </Button>
          
          <Button
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => onDeleteMovie(movie.id)}
            variant="outlined"
            color="error"
          >
            Удалить
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
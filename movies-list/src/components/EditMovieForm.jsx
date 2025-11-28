import React, { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Typography
} from '@mui/material';

const EditMovieForm = ({ movie, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: movie.title || '',
    year: movie.year || '',
    genre: movie.genre || '',
    impression: movie.impression || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.year.trim() || !formData.genre.trim()) {
      alert('Пожалуйста, заполните название, год и жанр фильма');
      return;
    }

    const updatedMovie = {
      ...movie,
      title: formData.title.trim(),
      year: formData.year.trim(),
      genre: formData.genre.trim(),
      impression: formData.impression.trim()
    };

    onSave(updatedMovie);
  };

  return (
    <Card variant="outlined" sx={{ bgcolor: 'grey.50' }}>
      <CardContent>
        <Typography variant="h6" component="h3" align="center" gutterBottom>
          Редактировать фильм
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              name="title"
              label="Название фильма *"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
              size="small"
            />
            <TextField
              name="year"
              label="Год *"
              type="number"
              value={formData.year}
              onChange={handleChange}
              inputProps={{ min: "1900", max: "2030" }}
              required
              size="small"
              sx={{ minWidth: 100 }}
            />
          </Box>
          
          <TextField
            name="genre"
            label="Жанр *"
            value={formData.genre}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            sx={{ mb: 2 }}
          />
          
          <TextField
            name="impression"
            label="Впечатление"
            value={formData.impression}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
          />
          
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: 'primary.main' }}
            >
              Сохранить
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={onCancel}
            >
              Отмена
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditMovieForm;
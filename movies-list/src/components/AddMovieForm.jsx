import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography
} from '@mui/material';

const AddMovieForm = ({ onAddMovie, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    genre: '',
    impression: ''
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

    const newMovie = {
      id: Date.now(),
      title: formData.title.trim(),
      year: formData.year.trim(),
      genre: formData.genre.trim(),
      impression: formData.impression.trim(),
      isFavorite: false
    };

    onAddMovie(newMovie);
    setFormData({ title: '', year: '', genre: '', impression: '' });
  };

  const handleCancel = () => {
    setFormData({ title: '', year: '', genre: '', impression: '' });
    onClose();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        Добавить новый фильм
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
        Заполните информацию о фильме
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
            autoFocus
          />
          <TextField
            name="year"
            label="Год *"
            type="number"
            value={formData.year}
            onChange={handleChange}
            inputProps={{ min: "1900", max: "2030" }}
            required
            sx={{ minWidth: 120 }}
          />
        </Box>
        
        <TextField
          name="genre"
          label="Жанр *"
          value={formData.genre}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        
        <TextField
          name="impression"
          label="Впечатления"
          value={formData.impression}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          sx={{ mb: 3 }}
        />
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ 
              bgcolor: 'primary.main',
              px: 4
            }}
          >
            Добавить фильм
          </Button>
          <Button
            type="button"
            variant="outlined"
            size="large"
            onClick={handleCancel}
            sx={{ px: 4 }}
          >
            Отмена
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddMovieForm;
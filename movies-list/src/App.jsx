import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import FilterPanel from './components/FilterPanel';
import MovieList from './components/MovieList';
import AddMovieForm from './components/AddMovieForm';
import Modal from './components/Modal';

// Создаем кастомную тему
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a1a1a',
    },
    secondary: {
      main: '#8B0000',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 6,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

// Начальные данные для примера
const initialMovies = [
  {
    id: 1,
    title: "Крестный отец",
    year: "1972",
    genre: "Криминал, Драма",
    impression: "Шедевр кинематографа! Отличная актерская игра Марлона Брандо и Аль Пачино. Сюжет захватывающий, показывает жизнь мафиозных семей с разных сторон. Особенно впечатлила сцена крещения в конце фильма - гениальное переплетение религиозного обряда и убийств. Диалоги стали классикой, а операторская работа просто безупречна. Фильм, который нужно пересматривать несколько раз, чтобы заметить все детали и нюансы.",
    isFavorite: true
  },
  {
    id: 2,
    title: "Форрест Гамп",
    year: "1994",
    genre: "Драма, Романтика",
    impression: "Трогательная история о простом человеке в сложное время. Том Хэнксы великолепен в роли Форреста. Фильм заставляет задуматься о жизни, любви и судьбе.",
    isFavorite: false
  },
  {
    id: 3,
    title: "Начало",
    year: "2010", 
    genre: "Фантастика, Триллер",
    impression: "Умный и сложный фильм Кристофера Нолана о снах внутри снов. Потрясающие визуальные эффекты, запутанный сюжет и философские вопросы о реальности. Леонардо ДиКаприо отлично справился с ролью вора идей. Особенно впечатлила сцена с вращающимся коридором и концепция лимба - пространства забвения. Фильм, который заставляет думать и обсуждать его с друзьями еще долгое время после просмотра. Каждый раз находишь что-то новое при повторном просмотре.",
    isFavorite: true
  }
];

function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredMovies = activeFilter === 'favorites' 
    ? movies.filter(movie => movie.isFavorite)
    : movies;

  const toggleFavorite = (movieId) => {
    setMovies(prevMovies => 
      prevMovies.map(movie => 
        movie.id === movieId 
          ? { ...movie, isFavorite: !movie.isFavorite } 
          : movie
      )
    );
  };

  const addMovie = (newMovie) => {
    setMovies(prevMovies => [...prevMovies, newMovie]);
    setIsModalOpen(false);
  };

  const editMovie = (updatedMovie) => {
    setMovies(prevMovies => 
      prevMovies.map(movie => 
        movie.id === updatedMovie.id ? updatedMovie : movie
      )
    );
  };

  const deleteMovie = (movieId) => {
    if (window.confirm('Вы уверены, что хотите удалить этот фильм?')) {
      setMovies(prevMovies => prevMovies.filter(movie => movie.id !== movieId));
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar />
        <FilterPanel 
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
        
        <Box 
          component="main" 
          sx={{ 
            maxWidth: 1000,
            mx: 'auto',
            my: 2,
            p: 3,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'primary.main',
            borderRadius: 2,
            boxShadow: 1
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <AddMovieForm 
                onAddMovie={addMovie} 
                onClose={closeModal}
              />
            </Modal>
          </Box>
          
          <MovieList 
            movies={filteredMovies}
            onToggleFavorite={toggleFavorite}
            onEditMovie={editMovie}
            onDeleteMovie={deleteMovie}
            activeFilter={activeFilter}
            onAddMovieClick={openModal}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = ['Фильмы', 'Книги', 'Музыка'];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = () => (
    <Box
      sx={{
        width: 250,
        bgcolor: '#1a1a1a',
        height: '100%',
        color: 'white',
        
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Typography
        variant="h6"
        sx={{
          p: 2,
          borderBottom: '1px solid #2d2d2d',
          fontWeight: 700
        }}
      >
        GSV
      </Typography>
      
      <List>
        {menuItems.map((item) => (
          <ListItem 
            key={item}
            sx={{
              borderBottom: '1px solid #2d2d2d',
              '&:hover': {
                bgcolor: '#404040'
              }
            }}
          >
            <ListItemText 
              primary={item}
              primaryTypographyProps={{
                fontSize: '1.1rem',
                fontWeight: 500
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="sticky" 
      elevation={1}
      sx={{ 
        bgcolor: '#1a1a1a',
        borderBottom: '1px solid #2d2d2d'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 4, md: 3 } }}>
        {/* Левая часть - логотип */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 700,
              color: 'white',
              letterSpacing: 1
            }}
          >
            GSV
          </Typography>
        </Box>

        {/* Десктопное меню */}
        {!isMobile && (
          <Box sx={{ 
            flex: 2, 
            display: 'flex', 
            justifyContent: 'flex-end',
            borderRadius: 2,
            p: 1,
            gap: 1
          }}>
            {menuItems.map((item) => (
              <Button
                key={item}
                variant="contained"
                sx={{
                  bgcolor: '#404040',
                  color: 'white',
                  px: 10,
                  py: 1,
                  '&:hover': {
                    bgcolor: '#700000'
                  }
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
        )}

        {/* Мобильное меню */}
        {isMobile && (
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{
                color: 'white',
                '&:hover': {
                  bgcolor: '#404040'
                }
              }}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              sx={{
                '& .MuiDrawer-paper': {
                  bgcolor: 'transparent'
                }
              }}
            >
              {drawerContent()}
            </Drawer>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;  
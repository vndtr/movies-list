import React from 'react';
import { Modal as MuiModal, Box, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <MuiModal
      open={isOpen}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Box
        sx={{
          position: 'relative',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          maxWidth: 500,
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto'
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'grey.500',
            zIndex: 1
          }}
        >
          <CloseIcon />
        </IconButton>
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;
import React from 'react';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    colours: {
      darkBlue?: React.CSSProperties['color'];
    };
  }
}

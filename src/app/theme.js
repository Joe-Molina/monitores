import { createTheme } from '@emotion/react';
import { dark } from 'styled-components';

const lightTheme = createTheme({
    palette: {
        primary: '#007bff',
        secondary: '#6c757d',
        background: '#fff',
        text: '#212529',
    },
});

const darkTheme = createTheme({
    palette: {
        primary: '#212529',
        secondary: '#424242',
        background: '#363636',
        text: '#f8f9fa',
    },
});

export { lightTheme, darkTheme };
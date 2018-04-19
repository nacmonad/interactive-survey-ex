import { createMuiTheme } from 'material-ui/styles';
import {colourGenerator, convertToRgba   } from './js/colourGenerator';

// Edit theme here --> extract to own file...
// https://material-ui-next.com/customization/themes/
const theme = createMuiTheme({
  typography: {
    // Use the system font over Roboto.
    fontFamily:
      'Futura'
    },
  palette: {
    secondary: {
      'light?': convertToRgba(colourGenerator(1), 0.8),
      main: convertToRgba(colourGenerator(1), 1),
      'dark?': convertToRgba(colourGenerator(1), 1)
    },
    primary: {
      'light?': convertToRgba(colourGenerator(2), 0.8),
      main: convertToRgba(colourGenerator(2), 1),
      'dark?': convertToRgba(colourGenerator(2), 1)
    }
  }
});

export default theme;

import { createMuiTheme } from 'material-ui/styles';

// Edit theme here --> extract to own file...
// https://material-ui-next.com/customization/themes/
const theme = createMuiTheme({
  typography: {
    // Use the system font over Roboto.
    fontFamily:
      'Futura'
    },
});

export default theme;

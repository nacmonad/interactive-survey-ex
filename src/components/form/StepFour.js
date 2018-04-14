import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';

import Checkbox from 'material-ui/Checkbox'
import colourGenerator from '../../js/colourGenerator'

const styles = {
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}
class StepThree extends Component {

  render() {
    const { classes } = this.props;

    return (
      <div>

        <Typography variant="headline" component="h2">
          THANKS!
        </Typography>

      </div>

    )
  }
}

export default withStyles(styles)(StepThree);

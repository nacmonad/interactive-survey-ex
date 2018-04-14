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
class StepTwo extends Component {
  

  render() {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <div>
        <Typography className={classes.title} color="textSecondary">
          What is your
        </Typography>
        <Typography variant="headline" component="h2">
          favorite colour?
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          red
        </Typography>
      </div>

    )
  }
}

export default withStyles(styles)(StepTwo);

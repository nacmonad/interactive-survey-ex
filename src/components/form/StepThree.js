import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';


import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';

import Slider, { Range } from 'rc-slider';

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
  _handleChange(e) {
    console.log(e.target.value)
    console.log(this.props.form.questionOne.text)
    //this.props.updateResponseSet({question:1, text:e.target.value})
  }
  render() {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    console.log(this.props)
    return (
      <div style={{width:'100%', overflow:'hidden'}}>
        <Typography className={classes.title} color="textSecondary">
          Where would you like to see
        </Typography>
        <Typography variant="headline" component="h2">
          innovation efforts
        </Typography>

      </div>

    )
  }
}

export default withStyles(styles)(StepThree);

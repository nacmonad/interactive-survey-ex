import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';


import Input from 'material-ui/Input';
import TextField from 'material-ui/TextField';

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

  _handleChange(e) {
    console.log(e.target.value)
    console.log(this.props.form.questionTwo.text)
    this.props.updateResponseSet({question:2, text:e.target.value})
  }
  render() {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <div style={{width:'100%', overflow:'hidden'}}>
        <Typography className={classes.title} color="textSecondary">
          What inspires
        </Typography>
        <Typography variant="headline" component="h2">
          you to work?
        </Typography>
        <Input
          type="text"
          id="question-two"
          multiline
          value={this.props.form.questionTwo.text}
          onChange={this._handleChange.bind(this)}
          className={classes.textField}
          margin="none"
          style={{width:'70%'}}
        />

      </div>

    )
  }
}

export default withStyles(styles)(StepTwo);

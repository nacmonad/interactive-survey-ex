import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';

import TextField from 'material-ui/TextField';
import Input from 'material-ui/Input';
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
class StepOne extends Component {
  state = {
    text: ""
  }

  _handleChange(e) {
    console.log(e.target.value)
    console.log(this.props.form.questionOne.text)
    this.props.updateResponseSet({question:1, text:e.target.value})
  }
  render() {
    console.log(this.props)
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    return (
      <div style={{width:'100%', overflow:'hidden'}}>
        <Typography className={classes.title} color="textSecondary">
          How do you
        </Typography>
        <Typography variant="headline" component="h2">
          show compassionate care?
        </Typography>
        <Input
          type="text"
          id="question-one"
          multiline
          value={this.props.form.questionOne.text}
          className={classes.textField}
          margin="normal"
          style={{width:'70%'}}
          onChange={this._handleChange.bind(this)}
        />

      </div>

    )
  }
}

export default withStyles(styles)(StepOne);

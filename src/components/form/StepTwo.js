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
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%', height:'100%', overflow:'hidden'}}>
        <Typography variant="headline" color="primary">
          What inspires you to work?
        </Typography>
        <TextField
          type="text"
          id="question-two"
          multiline
          placeholder="Tell us what you think..."
          rows={10}
          rowsMax={14}
          inputProps={{style:{backgroundColor:'#efefef', marginTop:'2em', borderRadius:'5px'}}}

          value={this.props.form.questionTwo.text}
          onChange={this._handleChange.bind(this)}
          className={classes.textField}
          margin="none"
          style={{width:'70%'}}
          helperText={this.props.form.questionTwo.text !== "" ? "Swipe right or click Next when complete." : ""}
          FormHelperTextProps={{
            style:{
              zIndex:1,
              height:'1rem'
            }
          }}
        />

      </div>

    )
  }
}

export default withStyles(styles)(StepTwo);

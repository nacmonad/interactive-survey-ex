import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';

import TextField from 'material-ui/TextField';
//import Input from 'material-ui/Input';

import Typography from 'material-ui/Typography';

import {store} from '../../App'
import Checkbox from 'material-ui/Checkbox'
import {colourGenerator} from '../../js/colourGenerator'

// const withStylesProps = styles =>
//   Component =>
//     props => {
//       const Comp = withStyles(theme => styles({...props, theme}))(Component);
//       return <Comp {...props} />;
//     };

let styles = theme => ({
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  // underline:{
  //   '&:after': {
  //      backgroundColor: colourGenerator(4),
  //    },
  //   }
})


class StepOne extends Component {
  state = {
    text: ""
  }

  _handleChange(e) {
    this.props.updateResponseSet({question:1, text:e.target.value})
  }

  render() {

    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;


    return (
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%', height:'100%', overflow:'hidden'}}>
        <Typography variant="headline" color="primary">
          How do you show compassionate care?
        </Typography>
        <TextField
          type="text"
          id="question-one"
          multiline
          placeholder="Tell us what you think..."
          rows={10}
          rowsMax={14}
          inputProps={{style:{backgroundColor:'#efefef', marginTop:'2em', borderRadius:'5px'}}}
          value={this.props.form.questionOne.text}
          className={classes.textField}
          margin="none"
          style={{width:'70%'}}
          onChange={this._handleChange.bind(this)}
          helperText={this.props.form.questionOne.text !== "" ? "Swipe right or click Next when complete." : ""}
          FormHelperTextProps={{
            style:{
              zIndex:1,
              height:'1rem'
            },
            margin: 'dense'
          }}

        />

      </div>

    )
  }
}

export default withStyles(styles)(StepOne);

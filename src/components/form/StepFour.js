import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox'
import {colourGenerator} from '../../js/colourGenerator'

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


    return (
      <div style={{height:'100%',display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>

        <Typography variant="headline" color="primary">
          Thanks for participating!
        </Typography>
        <Typography variant="body1" >
          You can explore the survey results by hiding the form and using the tabs above.
        </Typography>
        <Button variant="raised" style={{ width:'280px' , marginTop:'2rem'}} onClick={this.props.hideForm}>
         Hide Form
        </Button>
      </div>

    )
  }
}

export default withStyles(styles)(StepThree);

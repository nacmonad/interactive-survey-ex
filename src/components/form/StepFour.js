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

        <Typography variant="headline" component="h2">
          THANKS!
        </Typography>
        <Button variant="raised" style={{ width:'280px' }} onClick={this.props.hideForm}>
         Hide Form
        </Button>
      </div>

    )
  }
}

export default withStyles(styles)(StepThree);

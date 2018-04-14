import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';
import List, {ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox'
import{ convertToRgba, colourGenerator} from '../../js/colourGenerator'

const styles = {
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}
class StepZero extends Component {
  state = {
    checked: Array(11).fill(false),
  }
  handleChange = (i,event) => {
      event.stopPropagation();
      let newChecked = Array(11).fill(false);
      newChecked[i] = !newChecked[i];

      this.setState({ checked: newChecked});
    };
  componentDidUpdate() {
    if(this.state.checked.indexOf(true) > -1) {
      console.log("setting progress bar style")
      document.getElementById('form-stepper').getElementsByTagName('div')[0].childNodes[0].style.backgroundColor =convertToRgba(colourGenerator(this.state.checked.indexOf(true)+1), 1)
    }
    //= convertToRgba(colourGenerator(this.state.checked.indexOf(true)+1), 1)
  }

  render() {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <div>
        <Typography className={classes.title} color="textSecondary">
          Choose your
        </Typography>
        <Typography variant="headline" component="h2">
          pro{bull}fess{bull}ion
        </Typography>
        <List>
          {this.state.checked.map((e,i)=>{
              return (

                    <ListItem onClick={this.handleChange.bind(this,i)} style={{ backgroundColor: e ?  convertToRgba(colourGenerator(i+1), 0.25) : "inherit", borderRadius:'2em', paddingTop:'0.125em', paddingBottom:'0.125em'}} key={i}>
                        <Checkbox
                          checked={e}
                          onChange={this.handleChange.bind(this,i)}
                          style={{color:colourGenerator(i+1)}}
                          value={`checked-${i}`}
                      /></ListItem>

                    )
                    })}
        </List>
      </div>

    )
  }
}

export default withStyles(styles)(StepZero);

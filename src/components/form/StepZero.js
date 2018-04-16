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
    professions: ['Nursing',
    'Physician or Psychiatrist',
    'Other Health Professionals (Pharmacy, Social Work, Therapeutics, Diagnostics)',
    'Clinical Support Services',
    'Corporate Support Services',
    'Building Services, Materials Management, Logistics, Security',
    'Research',
    'Supervisors, Managers, Directors and Leadership Team',
    'Volunteers',
    'Patients and Visitors',
    'Third Party Staff : Tim Hortons, Honeywell, Aramark'],

    }
  handleChange = (i,event) => {
      event.stopPropagation();
      let newChecked = Array(11).fill(false);
      newChecked[i] = !newChecked[i];

      this.props.formSetGroup(i)
      this.setState({ checked: newChecked});
    };
  componentDidUpdate() {
    if(this.state.checked.indexOf(true) > -1) {
      console.log("setting progress bar style")
      document.getElementById('form-stepper').getElementsByTagName('div')[0].childNodes[0].style.backgroundColor =convertToRgba(colourGenerator(this.state.checked.indexOf(true)+1), 1)
      Array.from(document.getElementsByClassName('input-range__track--active')).map(e=>{
        e.style.backgroundColor = convertToRgba(colourGenerator(this.state.checked.indexOf(true)+1), 0.8)
      })
    Array.from(document.getElementsByClassName('input-range__slider')).map(e=>{
      e.style.backgroundColor = convertToRgba(colourGenerator(this.state.checked.indexOf(true)+1), 1)
      e.style.border = `1px solid ${convertToRgba(colourGenerator(this.state.checked.indexOf(true)+1), 1)}`
    })
    }
    //= convertToRgba(colourGenerator(this.state.checked.indexOf(true)+1), 1)
  }

  render() {
    const { classes } = this.props;


    return (
      <div>
        <Typography className={classes.title} color="textSecondary">
          Choose your
        </Typography>
        <Typography variant="headline" component="h2">
          profession
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
                      />{this.state.professions[i]}</ListItem>

                    )
                    })}
        </List>
      </div>

    )
  }
}

export default withStyles(styles)(StepZero);

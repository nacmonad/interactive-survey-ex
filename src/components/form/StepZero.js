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
    professions: [
    'Clinical Team Member – Nursing',
    'Clinical Team Member – Physician or Psychiatrist',
    'Clinical Team Member – Other Health Professionals (Pharmacy, Social Work, Therapeutics, Diagnostics, Personal Support Worker)',
    'Clinical Support Services – Administrative Support, Health Records, Environmental Services (EVS) and Patient Food Services etc.',
    'Corporate Support Services – (Finance, IT, HR, PMO, Risk, Legal, etc.)',
    'Building Services, Materials Management, Logistics, Security',
    'Research',
    'Supervisors, Managers, Directors and Leadership Team',
    'Volunteer',
    'Patient/Visitor',
    "Third Party Staff – Aramark, Honeywell, Tim Horton's"],

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

    Array.from(document.getElementsByClassName('input-range__label')).map(e=>{
      e.style.display = 'none'
    })
    }
    //= convertToRgba(colourGenerator(this.state.checked.indexOf(true)+1), 1)
  }

  render() {
    const { classes } = this.props;


    return (
      <div>
        <Typography variant="headline" color="primary">
          Choose your profession
        </Typography>
        <List>
          {this.state.checked.map((e,i)=>{
              return (

                    <ListItem className="list-item" onClick={this.handleChange.bind(this,i)} style={{ backgroundColor: e ?  convertToRgba(colourGenerator(i+1), 0.25) : "inherit", borderRadius:'2em', paddingTop:'0.125em', paddingBottom:'0.125em'}} key={i}>
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

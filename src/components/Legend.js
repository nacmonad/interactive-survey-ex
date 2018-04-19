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
class Legend extends Component {
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

  render() {
    const { classes } = this.props;


    return (
      <div>
        <Typography variant="headline" color="primary">
          Filter by profession
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

export default withStyles(styles)(Legend);
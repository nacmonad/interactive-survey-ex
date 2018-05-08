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
class StepZeroB extends Component {
  state = {
    checked: Array(6).fill(false),
    locations: [
      "St. Joseph’s Healthcare Hamilton – Charlton Campus",
      "St. Joseph’s Healthcare Hamilton – West 5th Campus",
      "St. Joseph’s Healthcare Hamilton – King Campus",
      "St. Joseph’s Healthcare Hamilton – Community",
      "St. Joseph’s Villa Dundas",
      "St. Joseph’s Home Care"
    ],

    }
  handleChange = (i,event) => {
      event.stopPropagation();
      let newChecked = Array(6).fill(false);
      newChecked[i] = !newChecked[i];

      this.props.formSetLocation(this.state.locations[i])
      this.setState({ checked: newChecked});
    };

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
                      />{this.state.locations[i]}</ListItem>

                    )
                    })}
        </List>
      </div>

    )
  }
}

export default withStyles(styles)(StepZeroB);

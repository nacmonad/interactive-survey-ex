import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';

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
class StepZero extends Component {
  state = {
    checked: Array(11).fill(false),
  }
  handleChange = (i,event) => {
      let newChecked = Array(11).fill(false);
      newChecked[i] = !newChecked[i];
      this.setState({ checked: newChecked});
    };


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
        <Typography className={classes.pos} color="textSecondary">
          noun
        </Typography>
        {this.state.checked.map((e,i)=>{
            return (<Checkbox
                      key={i}
                      checked={e}
                      onChange={this.handleChange.bind(this,i)}
                      style={{color:colourGenerator(i+1)}}
                      value={`checked-${i}`}
                    />)
                  })}
      </div>

    )
  }
}

export default withStyles(styles)(StepZero);

import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import GridList, {GridListTile} from 'material-ui/GridList'
import Checkbox from 'material-ui/Checkbox'

import IconButton from 'material-ui/IconButton';
import Add from 'material-ui-icons/Add';
import Menu from 'material-ui-icons/Menu';
import loremIpsum from 'lorem-ipsum'


import blue from 'material-ui/colors/blue';
import red from 'material-ui/colors/red';
import green from 'material-ui/colors/green';
import orange from 'material-ui/colors/orange';
import purple from 'material-ui/colors/purple';
import yellow from 'material-ui/colors/yellow';


const styles = {
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  checkedA: {
    color: blue[500],
  },
  checkedB: {
    color: red[500],
  },
  checkedC: {
    color: green[500],
  },
  checkedD: {
    color: purple[500],
  },
  checkedE: {
    color: orange[500],
  },
  checkedF: {
    color: yellow[500],
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};

class Form extends Component {
  state = {
    checked:
      {
      checkedA: false,
      checkedB: false,
      checkedC: false,
      checkedD: false,
      checkedE: false,
      checkedF: false,
    }
  }
  handleChange = name => event => {
    this.setState({ checked: {
      checkedA: false,
      checkedB: false,
      checkedC: false,
      checkedD: false,
      checkedE: false,
      checkedF: false,
      [name]: event.target.checked }});
  };
  
  handleAddSurvey = (event) => {
    event.preventDefault();
    console.log("add a survey!")
    const checked = Object.values(this.state.checked).indexOf(true);
    const text = loremIpsum({
        count: 4                      // Number of words, sentences, or paragraphs to generate. 
      , units: 'sentences'            // Generate words, sentences, or paragraphs. 
      , sentenceLowerBound: 5         // Minimum words per sentence. 
      , sentenceUpperBound: 15        // Maximum words per sentence. 
      , paragraphLowerBound: 3        // Minimum sentences per paragraph. 
      , paragraphUpperBound: 7        // Maximum sentences per paragraph. 
      , format: 'plain'               // Plain text or html 
      , random: Math.random           // A PRNG function. Uses Math.random by default 
    });

    if(checked > -1) this.props.handleFormSubmit(event, {
      id:this.counter++, 
      group:checked, 
      text:text,
      x: Math.random()*800,
      y: Math.random()*600 
    })
    
  }
  componentWillMount() {
    this.counter = 0;
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
          <Typography className={classes.pos} color="textSecondary">
            noun
          </Typography>
          
          <Checkbox
            checked={this.state.checked.checkedA}
            onChange={this.handleChange('checkedA')}
            classes={{
                checked: classes.checkedA,
              }}
            value="checkedA"
          />
          <Checkbox
            checked={this.state.checked.checkedB}
            onChange={this.handleChange('checkedB')}
            classes={{
                checked: classes.checkedB,
              }}
            value="checkedB"
          />
          <Checkbox
            checked={this.state.checked.checkedC}
            onChange={this.handleChange('checkedC')}
            classes={{
                checked: classes.checkedC,
              }}
            value="checkedB"
          />
          <Checkbox
            checked={this.state.checked.checkedD}
            onChange={this.handleChange('checkedD')}
            classes={{
                checked: classes.checkedD,
              }}
            value="checkedB"
          />
          <Checkbox
            checked={this.state.checked.checkedE}
            onChange={this.handleChange('checkedE')}
            classes={{
                checked: classes.checkedE,
              }}
            value="checkedE"
          />
          <Checkbox
            checked={this.state.checked.checkedF}
            onChange={this.handleChange('checkedF')}
            classes={{
                checked: classes.checkedF,
              }}
            value="checkedF"
          />
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleAddSurvey.bind(this)}>
              <Add/>
          </IconButton>
      </div>

    );
  }
}

export default withStyles(styles)(Form);





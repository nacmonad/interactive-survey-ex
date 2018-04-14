import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {formStepUp, formStepDown} from '../actions';

import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';

import Checkbox from 'material-ui/Checkbox'

import IconButton from 'material-ui/IconButton';
import Add from 'material-ui-icons/Add';

import loremIpsum from 'lorem-ipsum'

import SwipeableViews from 'react-swipeable-views';

import Stepper from './form/Stepper';
import colourGenerator from '../js/colourGenerator'
import StepZero from './form/StepZero';
import StepOne from './form/StepOne';
import StepTwo from './form/StepTwo';
import StepThree from './form/StepThree';
import StepFour from './form/StepFour';


const styles = {
  formWrapper:{
    //minWidth:'400px',
    paddingBottom:'25px'
  },
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
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};



class FormViewer extends Component {
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
      id:1,
      group:checked,
      text:text,
      x: Math.random()*800,
      y: Math.random()*600
    })

  }

  handleChangeIndex = (e) =>{
    if(e > this.props.form.step) this.props.formStepUp();
    if(e < this.props.form.step) this.props.formStepDown();
  }

  render() {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    return (
      <div id="form-wrapper" style={styles.formWrapper}>

          <SwipeableViews
            enableMouseEvents
            index={this.props.form.step}
            disabled={this.props.form.step === 4}
            onChangeIndex={this.handleChangeIndex}>
              <StepZero/>
              <StepOne/>
              <StepTwo/>
              <StepThree/>
              <StepFour/>
          </SwipeableViews>
          <Stepper
            activeStep={this.props.form.step}
            stepUp={this.props.formStepUp}
            stepDown={this.props.formStepDown}/>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    form: state.main.form
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({formStepUp, formStepDown }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FormViewer));

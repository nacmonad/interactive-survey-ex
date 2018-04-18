import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {formStepUp, formStepDown, formSetGroup, hideForm, updateResponseSet, toggleDisableSlider} from '../actions';

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
  _updateWidth(e){
    console.log(e)
  }

  render() {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <div id="form-wrapper"
        style={this.props.screenWidth < 880 ? {
            maxWidth:'100%',
            paddingTop:'1.5rem',
            paddingBottom:'1.5rem'
          } :{
            maxWidth:'50%',
            paddingTop:'1.5rem',
            paddingBottom:'1.5rem'
          } }>

          <SwipeableViews
            enableMouseEvents
            index={this.props.form.step}
            style={{maxWidth:'660px'}}
            disabled={
              this.props.form.disableSlider ||
              this.props.form.step === 0 && this.props.form.group < 0 ||
              this.props.form.step === 1 && this.props.form.questionOne.text === "" ||
              this.props.form.step === 2 && this.props.form.questionTwo.text === "" ||
              this.props.form.step >= 3
            }

            onChangeIndex={this.handleChangeIndex}>
              <StepZero updateResponseSet={this.props.updateResponseSet.bind(this)} formSetGroup={this.props.formSetGroup.bind(this)} form={this.props.form}/>
              <StepOne updateResponseSet={this.props.updateResponseSet.bind(this)} question={this.props.questionSet.text.data[0]} form={this.props.form}/>
              <StepTwo updateResponseSet={this.props.updateResponseSet.bind(this)} question={this.props.questionSet.text.data[1]} form={this.props.form}/>
              <StepThree
                enableMouseEvents
                question={this.props.questionSet.scale.data[0]}
                updateResponseSet={this.props.updateResponseSet.bind(this)}
                form={this.props.form}
                toggleDisableSlider={this.props.toggleDisableSlider.bind(this)}
                />
              <StepFour group ={this.props.form.group} hideForm= {this.props.hideForm}/>
          </SwipeableViews>
          <Stepper
            form={this.props.form}
            activeStep={this.props.form.step}
            stepUp={()=>{
              this.props.formStepUp()}}
            stepDown={this.props.formStepDown}/>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    questionSet: state.main.questionSet,
    form: state.main.form,
    responseSet: state.main.responseSet,
    showForm: state.main.showForm
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({formStepUp, formStepDown, formSetGroup, updateResponseSet, toggleDisableSlider, hideForm }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FormViewer));

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MobileStepper from 'material-ui/MobileStepper';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

import { convertToRgba, colourGenerator } from '../../js/colourGenerator';

const styles = {
  root: {
    maxWidth: "100%",
    flexGrow: 1,
    justifyContent:'space-around'
  },
  barColorPrimary: {
    color: colourGenerator(1)
  }
};

class Stepper extends React.Component {
  handleNext = () => {
    console.log(this.props.activeStep)
    if(this.props.activeStep > 1) {
      console.log("Post : " + this.props.activeStep);
    }
    this.props.stepUp();
  };

  handleBack = () => {
    this.props.stepDown();
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <MobileStepper
        id="form-stepper"
        variant="progress"
        steps={5}
        position="static"
        activeStep={this.props.activeStep}  //step controlled from FormViewer

        className={classes.root}
        color="secondary"
        nextButton={
          <Button size="small" onClick={this.handleNext}
          disabled={
            this.props.activeStep === 5 ||
            (this.props.form.step === 0 && this.props.form.group < 0) ||
            (this.props.form.step === 1 && this.props.form.location === "") ||
            (this.props.form.step === 2 && this.props.form.questionOne.text === "" )||
            (this.props.form.step === 3 && this.props.form.questionTwo.text === "")
            }>
            {this.props.activeStep > 3 ? "Submit" : "Next"}
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={this.handleBack} disabled={ true || this.props.activeStep === 0 || this.props.activeStep === 4 }>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    );
  }
}

Stepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Stepper);

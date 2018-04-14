import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MobileStepper from 'material-ui/MobileStepper';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

const styles = {
  root: {
    maxWidth: "100%",
    flexGrow: 1,
    justifyContent:'space-around'
  },
  progress:{
    backgroundColor:'pink'
  }
};

class Stepper extends React.Component {
  handleNext = () => {
    this.props.stepUp();
  };

  handleBack = () => {
    this.props.stepDown();
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <MobileStepper
        variant="progress"
        steps={4}
        position="static"
        activeStep={this.props.activeStep}  //step controlled from FormViewer

        className={classes.root}
        color="secondary"
        nextButton={
          <Button size="small" onClick={this.handleNext} disabled={this.props.activeStep === 4}>
            {this.props.activeStep > 2 ? "Submit" : "Next"}
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={this.handleBack} disabled={this.props.activeStep === 0 || this.props.activeStep === 4 }>
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

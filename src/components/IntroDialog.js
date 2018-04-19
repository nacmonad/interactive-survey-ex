import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
DialogActions,
DialogContent,
DialogContentText,
DialogTitle,
withMobileDialog,
} from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';

import logo from '../img/st-joes-logo.png'
import {colourGenerator} from '../js/colourGenerator';

const styles = {
  dialogContent:{
    height:'80vh',
  }
}
class ResponsiveDialog extends React.Component {

render() {

  return (
      <Dialog
        fullScreen={false}
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{""}</DialogTitle>
        <DialogContent
          style={styles.dialogContent}>

          <img src={logo} alt={"logo"} style={{height:'96px'}}/>
          <Typography variant="display3" style={{color:colourGenerator(2)}} gutterBottom>
            SHAPE OUR STRATEGY
          </Typography>

          <Typography variant="body2" gutterBottom>
          We are seeking the voices of our staff, physicians, learners, volunteers, patients
          and families on the ground level of strategic planning as we draw out the best in
          the three areas that define us:
          </Typography>

          <Typography variant="button" style={{marginTop:'1.75rem', color:colourGenerator(1)}} gutterBottom>
            COMPASSIONATE CARE. INSPIRED PEOPLE. SUCCESSFUL INNOVATION.
          </Typography>


        </DialogContent>
        <DialogActions style={{display:'flex', justifyContent:'center'}}>
          <Button onClick={this.props.closeDialog} color="primary" size="large" style={{width:'95%', height:'4rem', fontSize:'1.5rem'}} autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
  );
}
}

export default withMobileDialog()(ResponsiveDialog);

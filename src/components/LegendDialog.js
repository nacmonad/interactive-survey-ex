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

import logo from '../img/colour codes v2.svg'
import {colourGenerator} from '../js/colourGenerator';

const styles = {
  dialogContent:{
    height:'80vh',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center'
  }
}
class LegendDialog extends React.Component {

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
          <Typography variant="headline" color="primary" style={{marginBottom:'1rem'}}>
          LEGEND
          </Typography>

          <img src={logo} alt={"logo"} style={{width:'500px'}}/>

        </DialogContent>
        <DialogActions style={{display:'flex', justifyContent:'center'}}>
          <Button onClick={this.props.closeLegend} color="primary" size="large" style={{width:'95%', height:'4rem', fontSize:'1.5rem'}} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
}
}

export default withMobileDialog()(LegendDialog);

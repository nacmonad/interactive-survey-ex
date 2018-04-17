import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
DialogActions,
DialogContent,
DialogContentText,
DialogTitle,
withMobileDialog,
} from 'material-ui/Dialog';

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
        <DialogTitle id="responsive-dialog-title">{"Welcome to the St. Joe's Interactive Survey"}</DialogTitle>
        <DialogContent
          style={styles.dialogContent}>
          <DialogContentText>
            Please take the a moment to respond to the survey.  You can review recent responses in the viewer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.closeDialog} color="primary" autoFocus>
            Continue 
          </Button>
        </DialogActions>
      </Dialog>
  );
}
}

export default withMobileDialog()(ResponsiveDialog);

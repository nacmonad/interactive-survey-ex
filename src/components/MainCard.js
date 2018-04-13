
import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import GridList, {GridListTile} from 'material-ui/GridList'

import FormViewer from './FormViewer';
import ResponseViewer from './ResponseViewer';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    height:'100%'
  },
  gridList: {
    width: '100%',
    height: '100%'
  },
  subheader: {
    width: '100%',
  },
  card: {
    minWidth: 275,
    height:'100%'
  }
};

class MainCard extends Component {

  _handleFormSubmit(event, data){
    this.setState({surveys:[...this.state.surveys, data]})
  }

  render() {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    return (
      <Card className={classes.card}>
        <CardContent style={{height:'100%', display:'flex', flexDrection:'row', }}>
          <ResponseViewer/>
          <FormViewer handleFormSubmit={this._handleFormSubmit.bind(this)}/>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(MainCard);

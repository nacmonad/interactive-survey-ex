
import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import GridList, {GridListTile} from 'material-ui/GridList'

import Form from './Form';
import DataViz from './DataViz';

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
  state = {
    surveys: [], 
  }
  
  handleFormSubmit(event, data){
    this.setState({surveys:[...this.state.surveys, data]})
  }
  
  render() {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    return (
      <Card className={classes.card}>
        <CardContent style={{height:'100%'}}>
          <GridList className={classes.gridList} cols={2}>
          
            <GridListTile style={{height:'100%'}} key={0} cols={0}>
              <Typography variant="headline" component="h2">
                vis{bull}ual{bull}i{bull}za{bull}tion
              </Typography>
              <DataViz surveys={this.state.surveys}/>
            </GridListTile>
            
            <GridListTile key={1} cols={ 1}>
              <Form handleFormSubmit={this.handleFormSubmit.bind(this)}/>
            </GridListTile>
          
          </GridList>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(MainCard);





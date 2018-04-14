
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
    height:'100%'
  }
};

class MainCard extends Component {
  state = {
    width: window.innerWidth,
    formHeight: 250,
    mounted:false
  }
  _handleFormSubmit(event, data){
    console.log("form submit")
  }
  _updateWidth(e) {

    if(this.state.mounted) {
      this.setState({width:e.target.innerWidth, formHeight:document.getElementById("form-wrapper").clientHeight})
    }


  }
  componentWillMount() {
    window.addEventListener('resize', this._updateWidth.bind(this))
  }
  componentDidMount(){
    this.setState({formHeight:document.getElementById("form-wrapper").clientHeight, mounted:true})
  }
  render() {
    console.log(this.state.formHeight + 15)
    const wrapperStyle = this.state.width > 880 ? {height:'100%', display:'flex', flexDirection:  'row' }: {height:'100%', display:'flex', flexDirection:  'column-reverse'}

    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <Card style={wrapperStyle}>

          <ResponseViewer/>
          <FormViewer handleFormSubmit={this._handleFormSubmit.bind(this)} />

      </Card>
    );
  }
}

export default withStyles(styles)(MainCard);

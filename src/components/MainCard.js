
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeDialog, closeLegend, showLegend } from '../actions'
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import GridList, {GridListTile} from 'material-ui/GridList'

import FormViewer from './FormViewer';
import ResponseViewer from './ResponseViewer';
import IntroDialog from './IntroDialog';
import Header from './Header';
import Divider from './Divider';
import Footer from './Footer';
import LegendDialog from './LegendDialog';

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

  constructor(){
    super()
    this.state = {
        width: window.innerWidth,
        formHeight: 250,
        mounted:false,
      }
    this._updateWidth = this._updateWidth.bind(this)
  }

  _updateWidth(e) {
    console.log("update width")
    console.log(e)
    if(this.state.mounted ) {
      if(this.props.showForm) {
        this.setState({width:e.target.innerWidth, formHeight:document.getElementById("form-wrapper").clientHeight})
      } else {
        this.setState({width:e.target.innerWidth, formHeight:0})
      }

    }


  }




  componentWillMount() {
    window.addEventListener('resize', this._updateWidth)
  }
  componentDidMount(){
    this.setState({formHeight:document.getElementById("form-wrapper").clientHeight, mounted:true})
  }
  render() {
    let wrapperStyle = this.state.width > 880 ? {width:'100%',height:'100%', display:'flex', flexDirection:  'row' , justifyContent:'flex-end'}
        : {height:'100%', display:'flex', flexDirection:  'column-reverse', alignItems:'center'}

    return (
      <div>
        <Card style={{zIndex:0}}>
        <Header/>
        <Divider showForm={this.props.showForm} showLegend={this.props.showLegend} />
        <div style={wrapperStyle}>
            {!this.props.showIntroDialog && <ResponseViewer/>}
            {this.props.showForm &&  <FormViewer screenWidth={this.state.width}/>}
            {this.props.showIntroDialog && <IntroDialog open={this.props.showIntroDialog} closeDialog={this.props.closeDialog}/>}
            {this.props.showLegendDialog && <LegendDialog open={this.props.showLegendDialog} closeLegend={this.props.closeLegend}/>}
        </div>
        <Footer/>
        </Card>
      </div>
    );
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this._updateDimensions);
  }
}

const mapStateToProps = (state) => {
  return {
    showForm: state.main.showForm,
    showIntroDialog: state.main.showIntroDialog,
    showLegendDialog: state.main.showLegendDialog
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ closeDialog, closeLegend, showLegend }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MainCard));

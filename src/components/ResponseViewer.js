import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import DataViz from './dataviz/DataViz';
import DataVizTwo from './dataviz/DataVizTwo';

import {setActiveTab} from '../actions'

const styles = {
  vizWrap:{
    height:'100%',
    width:'100%',
  },
  flexContainer:{
    justifyContent:'space-around'
  }
};

const bull = <span className="bullet">•</span>;

class ResponseViewer extends Component {
  handleChange = (event, value) => {
    this.props.setActiveTab(value)
  };

  handleChangeIndex = index => {
    this.props.setActiveTab(index)
  };
  render() {
    const {classes} = this.props
    return (
      <div style={{width:'100%'}}>
      <div id="viz-head">
        <Typography variant="headline" component="h2">
          response visualization
        </Typography>
        <Tabs
          value={this.props.activeTab}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          classes={{
            flexContainer:classes.flexContainer
          }}
            fullWidth
          >
          <Tab label="One" />
          <Tab label="Two" />
          <Tab label="Three" />
        </Tabs>
        </div>
        <div className="viz-wrap" style={styles.vizWrap}>
          {this.props.activeTab < 2 && <DataViz questionId = {this.props.activeTab+1} responses = {this.props.responses} viz = {this.props.viz} showForm = {this.props.showForm}/>}
          {this.props.activeTab === 2 && <DataVizTwo questionId = {this.props.activeTab+1} responses = {this.props.responses} viz = {this.props.viz} showForm = {this.props.showForm}/>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    responses:state.main.responseSet.data,
    viz:state.main.viz,
    showForm:state.main.showForm,
    activeTab:state.main.activeTab
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setActiveTab }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResponseViewer));

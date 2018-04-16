import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Typography from 'material-ui/Typography';

import DataViz from './dataviz/DataViz';

const styles = {
  vizWrap:{
    height:'100%',
    width:'100%',
  }
};

const bull = <span className="bullet">•</span>;

class ResponseViewer extends Component {

  render() {

    return (

      <div className="viz-wrap" style={styles.vizWrap}>
        <Typography id="viz-head" variant="headline" component="h2">
          vis{bull}ual{bull}i{bull}za{bull}tion
        </Typography>
        <DataViz responses = {this.props.responses} viz = {this.props.viz} showForm = {this.props.showForm}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    responses:state.main.responseSet.data,
    viz:state.main.viz,
    showForm:state.main.showForm
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponseViewer);


import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import blue from 'material-ui/colors/blue';
import red from 'material-ui/colors/red';
import green from 'material-ui/colors/green';
import orange from 'material-ui/colors/orange';
import purple from 'material-ui/colors/purple';
import yellow from 'material-ui/colors/yellow';

import DataViz from './DataViz';

const styles = {
  vizWrap:{
    width:'100%'
  }
};

const bull = <span className="bullet">•</span>;

class ResponseViewer extends Component {
  state = {
    alpha:0,
    active:-1,
    zoomed:false,
  }

  render() {
    return (
      <div className="viz-wrap" style={styles.vizWrap}>
        <Typography variant="headline" component="h2">
          vis{bull}ual{bull}i{bull}za{bull}tion
        </Typography>
        <DataViz responses = {this.props.responses}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    responses:state.main.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponseViewer);

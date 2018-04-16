import React, { Component } from 'react';

import {store} from '../../App.js'
import {colourGenerator} from '../../js/colourGenerator'
import * as d3 from 'd3';

const styles = {
  dataViz: {
    height:'800px',
    width:'100%'
  }
};


class DataVizTwo extends Component {
  state = {
    alpha:0,
  }
  _updateDimensions(e) {
    console.log(e)
  }
  componentWillMount() {
    window.addEventListener("resize", this._updateDimensions.bind(this));
    this.responses = []
  }
  componentDidMount(){
    this.responses = this.props.responses.filter(e=>e.questionId===this.props.questionId);

    this.width = document.getElementById('data-viz').clientWidth
    this.height = document.getElementById('data-viz').clientHeight

    this.svg = d3.select('#data-viz');
    this.g = d3.select('#survey-group');

    this._updateDimensions()
    console.log("mounted...")
    console.log(this.responses)
    console.log(this.props)
  }


  render() {
    return (
        <svg id="data-viz" style={styles.dataViz}>
          <g id="survey-group">

          </g>
        </svg>
    );
  }
}

export default DataVizTwo;

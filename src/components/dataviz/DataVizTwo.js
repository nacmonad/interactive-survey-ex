import React, { Component } from 'react';

import {store} from '../../App.js'
import {colourGenerator, convertToRgba} from '../../js/colourGenerator'
import * as d3 from 'd3';

import Circle from './Circle';

const styles = {
  dataViz: {
    height:'800px',
    width:'100%'
  },
  horizontalBar:{
    strokeWidth:'2.5px',
    stroke:'black'
  },
  circle:{
    //r:25,
    strokeWidth:2.5,
  }
};


class DataVizTwo extends Component {

  constructor(){
    super()
    this.state = {
        alpha:0,
      }
    this._updateDimensions = this._updateDimensions.bind(this)
  }
  _getXScale() {
    const HEIGHT = 800
    const WIDTH = document.getElementById('data-viz').clientWidth;
    const xMax = 100;
    let marginLeft = 120
    let marginRight = 120
    if(window.innerWidth < 880) {
      marginLeft = 27.5
      marginRight = 27.5
    }

    return d3.scaleLinear()
        .domain([0, xMax])
        .range([marginLeft, WIDTH-marginRight]);
  }
  _getYScale() {
    const HEIGHT = 800
    const WIDTH = document.getElementById('data-viz').clientWidth;
    const marginBottom = 150
    const marginTop = 150
    const yMax = 1;
    return d3.scaleLinear()
        .domain([0,3])
        .range([marginBottom, HEIGHT-marginTop]);

  }
  _updateDimensions(e) {
    //const domObj = document.getElementById('data-viz');
    console.log("update dims dv2")
    this.xScale = this._getXScale()
    this.yScale = this._getYScale()
    this.forceUpdate();
  }
  componentWillMount() {
    window.addEventListener("resize", this._updateDimensions);
    this.responses = []
    this.xScale = this._getXScale()
    this.yScale = this._getYScale()
  }
  componentDidMount(){
    this.responses = this.props.responses.filter(e=>e.questionId===this.props.questionId);

    this.width = document.getElementById('data-viz').clientWidth
    this.height = document.getElementById('data-viz').clientHeight

    this.svg = d3.select('#data-viz');
    this.g = d3.select('#survey-group');

    this._updateDimensions()
    console.log("mounted...")
    //set stylesheet radius so enter transition works...
    // setTimeout(()=>{
    //   document.styleSheets[0].insertRule(".scale { r:25 } ", 0)
    // }, 400)
  }

  componentWillUpdate(nextProps){
    console.log("NEW PROPS UPDATE dviz@2")
    this.responses = nextProps.responses.filter(e=>e.questionId===this.props.questionId);
    console.log(this.responses)
  }
  componentDidUpdate(oldProps) {
    if(oldProps.showForm !== this.props.showForm) {
      console.log("form exited!")
      this._updateDimensions();
    }
  }
  render() {
    return (
        <svg id="data-viz" style={styles.dataViz}>
          <g id="survey-group">
            {[0,1,2,3].map(e=>{
              return(
                <line
                  key={`bar-${e}`}
                  x1={this.xScale(0)}
                  x2={this.xScale(100)}
                  y1={this.yScale(e)}
                  y2={this.yScale(e)}
                  style={styles.horizontalBar}
                />
              )
            })}

              {this.responses.map(e=>[e.group, e.scaleA]).map((e,i)=>{
                  return (
                    <Circle
                      key={`scaleA-${i}`}
                      className="scale"
                      {...styles.circle}
                      stroke={colourGenerator(e[0])}
                      fill={convertToRgba(colourGenerator(e[0]),0.1)}
                      cx={this.xScale(e[1])}
                      cy={this.yScale(0)}
                      />
                  )
                })
              }
              {this.responses.map(e=>[e.group, e.scaleB]).map((e,i)=>{
                  return (
                    <Circle
                      key={`scaleB-${i}`}
                      className="scale"
                      {...styles.circle}
                      fill={convertToRgba(colourGenerator(e[0]),0.1)}
                      stroke={colourGenerator(e[0])}
                      cx={this.xScale(e[1])}
                      cy={this.yScale(1)}
                      />
                  )
                })
              }
              {this.responses.map(e=>[e.group, e.scaleC]).map((e,i)=>{
                  return (
                    <Circle
                      key={`scaleC-${i}`}
                      className="scale"
                      {...styles.circle}
                      fill={convertToRgba(colourGenerator(e[0]),0.1)}
                      stroke={colourGenerator(e[0])}
                      cx={this.xScale(e[1])}
                      cy={this.yScale(2)}
                      />
                  )
                })
              }
              {this.responses.map(e=>[e.group, e.scaleD]).map((e,i)=>{
                  return (
                    <Circle
                      key={`scaleD-${i}`}
                      className="scale"
                      style={styles.circle}
                      fill={convertToRgba(colourGenerator(e[0]),0.1)}
                      stroke={colourGenerator(e[0])}
                      cx={this.xScale(e[1])}
                      cy={this.yScale(3)}
                      />
                  )
                })
              }

          </g>
        </svg>
    );
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this._updateDimensions);
    //document.styleSheets[0].deleteRule(0)
  }
}

export default DataVizTwo;

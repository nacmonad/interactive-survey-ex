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
        textA:0,
        textB:0,
        textC:0,
        textD:0
      }
    this._updateDimensions = this._updateDimensions.bind(this)
    this._positionTextY = this._positionTextY.bind(this)
  }
  _positionTextY(index) {
    const offsetY = 40
    const ret = document.getElementById("data-viz").getBoundingClientRect().top+this.yScale(index)+window.pageYOffset+offsetY
    return ret
  }
  _getXScale() {
    const HEIGHT = 800
    const WIDTH = document.getElementById('data-viz').getBoundingClientRect().width;
    const xMax = 100;
    let marginLeft = 120
    let marginRight = 120
    if(window.innerWidth < 1185) {
      marginLeft = 27.5
      marginRight = 27.5
    }

    return d3.scaleLinear()
        .domain([0, xMax])
        .range([marginLeft, WIDTH-marginRight]);
  }
  _getYScale() {
    const HEIGHT = 800
    const WIDTH = document.getElementById('data-viz').getBoundingClientRect().width;
    const marginBottom = 150
    const marginTop = 150
    const yMax = 1;
    return d3.scaleLinear()
        .domain([0,3])
        .range([marginBottom, HEIGHT-marginTop]);

  }
  _updateDimensions(e) {
    //const domObj = document.getElementById('data-viz');
    const canvasBB= document.getElementById("data-viz").getBoundingClientRect();
    let textOffsets = []

    Array.from(document.getElementsByClassName("scale-text")).map(e=>{

      textOffsets.push(parseInt(document.getElementById("data-viz").getBoundingClientRect().width-e.getBoundingClientRect().width)/2)
    })

    this.xScale = this._getXScale()
    this.yScale = this._getYScale()
    this.setState({
      textA: canvasBB.left+ textOffsets[0],
      textB: canvasBB.left+textOffsets[1],
      textC: canvasBB.left+textOffsets[2],
      textD: canvasBB.left+textOffsets[3]
    })
    //this.forceUpdate();
  }
  componentWillMount() {
    window.addEventListener("resize", this._updateDimensions);
    this.responses = []
    this.xScale = this._getXScale()
    this.yScale = this._getYScale()
  }
  componentDidMount(){
    this.responses = this.props.responses.filter(e=>e.questionId===this.props.questionId);

    this.width = document.getElementById('data-viz').getBoundingClientRect().width
    this.height = document.getElementById('data-viz').getBoundingClientRect().height

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
    this.responses = nextProps.responses.filter(e=>e.questionId===this.props.questionId);
  }
  componentDidUpdate(oldProps) {
    if(oldProps.showForm !== this.props.showForm) {
      console.log("form exited!")
      this._updateDimensions();
    }
  }
  render() {
    return (
      <div id="pos-ref">
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
        <div className="scale-text" style={{fontSize:'18px', position:'absolute', top: this._positionTextY(0), left:this.state.textA,  marginLeft:'1em', marginRight:'1em'}}>{this.props.questionThree.scaleA}</div>
        <div className="scale-text" style={{fontSize:'18px', position:'absolute', top: this._positionTextY(1), left:this.state.textB, marginLeft:'1em', marginRight:'1em'}}>{this.props.questionThree.scaleB}</div>
        <div className="scale-text" style={{fontSize:'18px', position:'absolute', top: this._positionTextY(2), left:this.state.textC, marginLeft:'1em', marginRight:'1em'}}>{this.props.questionThree.scaleC}</div>
        <div className="scale-text" style={{fontSize:'18px', position:'absolute', top: this._positionTextY(3), left:this.state.textD, marginLeft:'1em', marginRight:'1em'}}>{this.props.questionThree.scaleD}</div>
      </div>
    );
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this._updateDimensions);
    //document.styleSheets[0].deleteRule(0)
  }
}

export default DataVizTwo;


import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import GridList, {GridListTile} from 'material-ui/GridList'

import blue from 'material-ui/colors/blue';
import red from 'material-ui/colors/red';
import green from 'material-ui/colors/green';
import orange from 'material-ui/colors/orange';
import purple from 'material-ui/colors/purple';
import yellow from 'material-ui/colors/yellow';

import Form from './Form';

import * as d3 from 'd3';

const styles = {
  dataViz: {
    height:'100%',
    width:'100%'
  }
};

class DataViz extends Component {
  state = {
    alpha:0
  }
  componentWillMount() {
    this.surveys = this.props.surveys;
    this.radius = 25;
  }
  componentDidMount(){
    
    this.svg = d3.select('#data-viz');
    
    
    
  }
  componentDidUpdate(oldProps){
    if(JSON.stringify(oldProps.surveys) !== JSON.stringify(this.props.surveys)){
      console.log("let d3 take over!")
      
      this.surveys = this.props.surveys;
      d3.selectAll('rect').data(this.surveys).enter();
      this.simulation = d3.forceSimulation();
      this.simulation
        .force("collide", d3.forceCollide()
          .strength(1)
          .radius(this.radius)
          .iterations(1)
        )
        .force("charge", d3.forceManyBody()
          .strength(100)
          .distanceMin(10)
          .distanceMax(100))
        .force("center", d3.forceCenter(document.getElementById('data-viz').clientWidth / 2, document.getElementById('data-viz').clientHeight / 2));  

          
      this.simulation
        .nodes(this.surveys)
        .on("tick", this.ticked.bind(this));
    }
          

  }
  ticked() {
    this.setState({alpha:this.simulation.alpha()})
  }
  genColor(group) {
    switch(group){
        case 0:
          return blue[500]
        case 1:
          return red[500]
        case 2:
          return green[500]
        case 3:
          return purple[500]
        case 4:
          return orange[500]
        case 5  :
          return yellow[500]
        default:
          return 'pink'
      }
  }
  render() {
    return (
      <svg id="data-viz" style={styles.dataViz}>
        {
          this.surveys.map((e,i)=>{
            return (
              <rect key={e.id} x={e.x} y={e.y} width={25} height={10} fill={this.genColor(e.group)}></rect>
              )
          })
        }
      </svg>
    );
  }
}

export default DataViz;





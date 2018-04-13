
import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';

import blue from 'material-ui/colors/blue';
import red from 'material-ui/colors/red';
import green from 'material-ui/colors/green';
import orange from 'material-ui/colors/orange';
import purple from 'material-ui/colors/purple';
import yellow from 'material-ui/colors/yellow';

import * as d3 from 'd3';

const styles = {
  dataViz: {
    height:'100%',
    width:'100%'
  }
};


class DataViz extends Component {
  state = {
    alpha:0,
    active:-1,
    zoomed:false,
  }
  componentWillMount() {
    this.responses = []
    console.log("mounting...")
    console.log(this.props)
  }
  componentDidMount(){
    this.responses = this.props.responses;
    this.radius = 25;
    this.width = document.getElementById('data-viz').clientWidth
    this.height = document.getElementById('data-viz').clientHeight
    this.svg = d3.select('#data-viz');
    this.g = d3.select('#survey-group');
    this.zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on("zoom", this.zoomed);

    this.svg.on("click", this.resetZoom.bind(this));

    console.log("mounted...")
    console.log(this.responses)
    console.log(this.props)
  }
  componentDidUpdate(oldProps){
    if(JSON.stringify(oldProps.responses) !== JSON.stringify(this.props.responses)){
      console.log("let d3 take over!")

      this.responses = this.props.responses;
      this.paths = this.g.data(this.responses).enter();

      this.simulation = d3.forceSimulation();
      this.simulation
        .force("collide", d3.forceCollide()
          .strength(0.8)
          .radius(this.radius)
          .iterations(1)
        )
        .force("charge", d3.forceManyBody()
          .strength(10)
          .distanceMin(50)
          .distanceMax(1000))
          .force("center", d3.forceCenter(document.getElementById('data-viz').clientWidth / 2, document.getElementById('data-viz').clientHeight / 2));


      this.simulation
        .nodes(this.responses)
        .on("tick", this.ticked.bind(this));

      this.simulation.alphaTarget(0)
    }


  }
  ticked() {
    this.setState({alpha:this.simulation.alpha()})
  }
  clicked(d, w, h) {
      var dx = parseFloat(d.width.baseVal.value),
          dy = parseFloat(d.height.baseVal.value),
          x = d.x.baseVal.value + dx / 2,
          y = d.y.baseVal.value-dy/8,
          scale = 3*Math.max(1, Math.min(8, 0.9 / Math.max(dx / w, dy / h))),
          translate = [w / 2 - scale * x, h / 2  / 2 - scale * y];

      this.svg.transition()
          .duration(750)
          // .call(zoom.translate(translate).scale(scale).event); // not in d3 v4
          .call( this.zoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale) ); // updated for d3 v4
      this.setState({zoomed:true})
    }
  zoomed() {
      d3.selectAll('rect').style("stroke-width", 1.5 / d3.event.transform.k + "px");
      d3.selectAll('rect').attr("transform", d3.event.transform); // updated for d3 v4
  }
  resetZoom() {
    this.setState({active:-1, zoomed:false})
    this.svg.transition()
        .duration(750)
        .call( this.zoom.transform, d3.zoomIdentity ); // updated for d3 v4

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
  handleClick(event) {

    //zoom to bounding box
    this.clicked(event.target, this.width, this.height)
    //class as active
    this.setState({active:event.target.id})
  }
  render() {
    return (
        <svg id="data-viz" style={styles.dataViz}>
          <g id="survey-group">
            {
              this.responses.map((e,i)=>{

                return (
                  <g key={e._id}>
                    <rect
                      id={e._id}
                      className={parseInt(e._id) === parseInt(this.state.active) ? "active": ""}
                      x={e.x}
                      y={e.y}
                      width={25}
                      height={10}
                      stroke={'black'}
                      strokeWidth={1}
                      fill={this.genColor(e.group)}
                      onClick={this.handleClick.bind(this)}>

                      </rect>
                      { ( parseInt(e._id) === parseInt(this.state.active) ) ?
                        ( <foreignObject x="160" y="220" width="450" height="200">
                            <p className="foreign-object">
                              {e.text}
                            </p>
                          </foreignObject> ) :
                        ("")
                      }
                    </g>
                  )
              })
            }
          </g>
        </svg>
    );
  }
}

export default DataViz;

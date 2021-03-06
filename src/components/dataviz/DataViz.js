  import React, { Component } from 'react';

import {store} from '../../App.js'
import {colourGenerator} from '../../js/colourGenerator'
import * as d3 from 'd3';

import ResponseBox from './ResponseBox';

const styles = {
  dataViz: {
    height:'800px',
    width:'100%'
  }
};
const STROKE_WIDTH = 0.5;

const categoryCenters = {
  left: {x:300, y:400},
  right: {x:500, y:400}
}

class DataViz extends Component {
  state = {
    alpha:0,
    active:-1,
    zoomed:false,
    textShow:false,
    textLeft:0,
    textTop:0,
    textWidth:0,
    textHeight:0,
    text: "",
    group: -1
  }
  constructor() {
    super()
    this._updateDimensions = this._updateDimensions.bind(this)
  }
  componentWillMount() {
    window.addEventListener("resize", this._updateDimensions);
    this.responses = []

  }
  componentDidMount(){
    this.responses = this.props.responses.filter(e=>e.questionId===this.props.questionId);
    this.radius = 25;
    this.width = document.getElementById('data-viz').getBoundingClientRect().width
    this.height = styles.dataViz.height;
    this.svg = d3.select('#data-viz');
    this.g = d3.select('#survey-group');
    this.zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on("zoom", this.zoomed);

    this.svg.on("click", this.resetZoom.bind(this));

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
      .force("center", d3.forceCenter(document.getElementById('data-viz').getBoundingClientRect().width/2, document.getElementById('data-viz').getBoundingClientRect().height/2));

      this.paths = this.g.data(this.responses);
      this.paths.enter().merge(this.paths);

      this.simulation
        .nodes(this.responses)
        .on("tick", this.ticked.bind(this));


  }
  shouldComponentUpdate(newProps) {
    if(this.state.textShow ) {
      //block updates like text edits, or new rect entries
      return false;
    }
    return true;
  }

  componentDidUpdate(oldProps){
    if(JSON.stringify(oldProps.responses) !== JSON.stringify(this.props.responses) ||
      oldProps.questionId !== this.props.questionId){
      //console.log("let d3 take over!")

      this.responses = this.props.responses.filter(e=>e.questionId===this.props.questionId);
      this.paths = this.g.data(this.responses);
      this.paths.enter().merge(this.paths);

      this.simulation
        .nodes(this.responses)
        .on("tick", this.ticked.bind(this));

      this.simulation.alpha(1).restart();

    }
    if(oldProps.showForm !== this.props.showForm) {

      this._updateDimensions();
    }

  }

  componentWillUnmount(){
    this.simulation.stop();
    window.removeEventListener('resize', this._updateDimensions);
    clearTimeout(this.timeout)

  }

  ticked(e) {

    if(!this.props.viz.zoomed) {
      this.setState({alpha:this.simulation.alpha()})
    }

  }

  zoomed() {
      d3.selectAll('rect').style("stroke-width", STROKE_WIDTH / d3.event.transform.k + "px");
      d3.selectAll('rect').attr("transform", d3.event.transform); // updated for d3 v4
  }
  resetZoom() {

    this.svg.transition()
        .duration(750)
        .call( this.zoom.transform, d3.zoomIdentity ); // updated for d3 v4

    this.setState({textShow:false})
    store.dispatch({type:"ZOOMED", payload:{active:-1, zoomed:false}})
    this.simulation.restart()
  }
  clicked(d, w, h) {
      var scalar = window.innerWidth < 880 ? 1.5 : 3
      var dx = parseFloat(d.width.baseVal.value),
          dy = parseFloat(d.height.baseVal.value),
          x = d.x.baseVal.value + dx / 2,
          y = d.y.baseVal.value-dy/8,
          scale = scalar*Math.max(1, Math.min(8, 0.9 / Math.max(dx / w, dy / h))),
          translate = [w / 2 - scale * x, h / 2  / 2 - scale * y];
      this.svg.transition()
          .duration(750)
          // .call(zoom.translate(translate).scale(scale).event); // not in d3 v4
          .call( this.zoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale) ); // updated for d3 v4
      this.simulation.stop()


      this.timeout = setTimeout(()=>this.afterTimeout(d), 800)
    }

    afterTimeout(d) {
      const bb = document.getElementById(d.id).getBoundingClientRect()

      let offsetY = document.getElementById("viz-head").clientHeight;
      if(this.props.showForm) {
        offsetY = window.innerWidth > 880 ? (document.getElementById("viz-head").clientHeight ): (document.getElementById("viz-head").clientHeight + document.getElementById("form-wrapper").clientHeight )
      }

      this.setState({
        textShow:true,
        textLeft:bb.left.toString(),
        textBottom:(bb.top + window.pageYOffset - offsetY).toString(),
        textWidth:bb.width,
        textHeight:bb.height,
        text:this.props.viz.text,
        group:this.props.viz.group
      })
    }
  handleClick(event) {
    const domObj = document.getElementById('data-viz');
    //zoom to bounding box
    this.clicked(event.target, domObj.getBoundingClientRect().width, domObj.getBoundingClientRect().height)
    //class as active
    const respIndex = this.responses.findIndex(e=>e._id===event.target.id);
    store.dispatch({type:"ZOOMED", payload:{active:event.target.id, zoomed:true, group:this.responses[respIndex].group, text:this.responses[respIndex].text  }})
  }
  _updateDimensions(e) {
    const domObj = document.getElementById('data-viz');
    if(this.responses.length > 0) {
      this.simulation
        .force("center", d3.forceCenter(domObj.getBoundingClientRect().width/2, domObj.getBoundingClientRect().height/2));
      this.simulation.alpha(1).restart()
    }
  }

  render() {
    return (
        <div>
          <svg id="data-viz" style={styles.dataViz}>
            <g id="survey-group">
              {
                this.responses.map((e,i)=>{
                  return (
                    <g key={e._id}>
                      <rect
                        id={e._id}
                        className={e._id === this.props.viz.active ? "active": ""}
                        x={e.x}
                        y={e.y}
                        width={25}
                        height={18}
                        stroke={'black'}
                        strokeWidth={STROKE_WIDTH}
                        rx={2}
                        ry={2}
                        fill={colourGenerator(e.group)}
                        onClick={this.handleClick.bind(this)}>

                        </rect>
                        { /*(e._id === this.props.viz.active && this.state.textShow) ?
                          ( <foreignObject x={this.state.textLeft-10} y={this.state.textBottom-10-128} width={this.state.textWidth-10} height={this.state.textHeight-10}>

                            </foreignObject> ) :
                          ("")
                        */}
                      </g>
                    )
                })
              }
            </g>
          </svg>
          {this.props.viz.active && this.state.textShow && <ResponseBox showForm={this.props.showForm} text={this.props.viz.text} group={this.props.viz.group} x={this.state.textLeft-10} y={this.state.textBottom-10-128} width={this.state.textWidth-10} height={this.state.textHeight-10}/>}
        </div>
    );
  }
}

export default DataViz;

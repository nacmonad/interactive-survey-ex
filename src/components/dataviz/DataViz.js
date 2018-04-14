import React, { Component } from 'react';

import {store} from '../../App.js'
import colourGenerator from '../../js/colourGenerator'
import * as d3 from 'd3';

const styles = {
  dataViz: {
    height:'800px',
    width:'100%'
  }
};


class DataViz extends Component {
  state = {
    alpha:0,
    active:-1,
    zoomed:false,
    textShow:false,
    textLeft:0,
    textTop:0,
    textWidth:0,
    textHeight:0
  }
  componentWillMount() {
    window.addEventListener("resize", this._updateDimensions.bind(this));
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
  shouldComponentUpdate(newProps) {
    if(this.state.textShow) {
      //block updates like text edits, or new rect entries
      return false;
    }
    return true;
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

  componentWillUnmount(){
    this.simulation.stop();
  }
  ticked() {

    if(!this.props.viz.zoomed) this.setState({alpha:this.simulation.alpha()})

  }

  zoomed() {
      d3.selectAll('rect').style("stroke-width", 1.5 / d3.event.transform.k + "px");
      d3.selectAll('rect').attr("transform", d3.event.transform); // updated for d3 v4
  }
  resetZoom() {

    this.svg.transition()
        .duration(750)
        .call( this.zoom.transform, d3.zoomIdentity ); // updated for d3 v4

    store.dispatch({type:"ZOOMED", payload:{active:-1, zoomed:false}})
    this.setState({textShow:false})
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

      setTimeout(()=>{
        const bb = document.getElementById(d.id).getBoundingClientRect()
        const offsetY = window.innerWidth > 880 ? (document.getElementById("viz-head").clientHeight ): (document.getElementById("viz-head").clientHeight + document.getElementById("form-wrapper").clientHeight )

        this.setState({
          textShow:true,
          textLeft:bb.x,
          textBottom:bb.y + window.scrollY - offsetY,
          textWidth:bb.width,
          textHeight:bb.height
        })

      }, 800)
    }
  handleClick(event) {
    const domObj = document.getElementById('data-viz');
    //zoom to bounding box
    this.clicked(event.target, domObj.clientWidth, domObj.clientHeight)
    //class as active
    store.dispatch({type:"ZOOMED", payload:{active:event.target.id, zoomed:true}})
  }
  _updateDimensions(e) {
    const domObj = document.getElementById('data-viz');
    if(this.responses.length > 0) {
      this.simulation
        .force("center", d3.forceCenter(domObj.clientWidth/2, domObj.clientHeight / 2));
      this.simulation.restart()
    }
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
                      className={e._id === this.props.viz.active ? "active": ""}
                      x={e.x}
                      y={e.y}
                      width={25}
                      height={10}
                      stroke={'black'}
                      strokeWidth={1}
                      fill={colourGenerator(e.group)}
                      onClick={this.handleClick.bind(this)}>

                      </rect>
                      { (e._id === this.props.viz.active && this.state.textShow) ?
                        ( <foreignObject fill="pink" x={this.state.textLeft} y={this.state.textBottom} width={this.state.textWidth} height={this.state.textHeight}>
                            <div className="foreign-object" style={{backgroundColor:"pink", height:'100%', width:'100%', textAlign:'initial', padding:'1em'}}>
                              {e.text}
                            </div>
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

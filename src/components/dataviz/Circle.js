import React, {Component} from 'react'

import {colourGenerator} from '../../js/colourGenerator'

export default class Circle extends Component {
  state = {
    r:0
  }
  componentDidMount() {
    setTimeout(()=>{
      this.setState({r:25})
    }, 100)
  }
  render() {
    return(
      <circle
      {...this.props}
      r={this.state.r}  > </circle>
    )
  }
}

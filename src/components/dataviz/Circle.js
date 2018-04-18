import React, {Component} from 'react'

import {colourGenerator} from '../../js/colourGenerator'

export default class Circle extends Component {
  state = {
    r:0
  }
  componentDidMount() {
      this.setState({r:25})
  }
  render() {
    return(
      <circle
      {...this.props}
      r={this.state.r}  > </circle>
    )
  }
}

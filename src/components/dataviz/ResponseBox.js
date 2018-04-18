import React, {Component} from 'react'

import {colourGenerator, textColourGenerator } from '../../js/colourGenerator'
import {nameGenerator} from '../../js/nameGenerator';

const styles = {

  blockDecorator:{
    fontFamily: `Georgia, serif`,
    position:'asbolute',
    zIndex:1,
    fontSize:'96px'
  },
  responseText:{
    marginTop:'1em',
    marginLeft:'1em'
  },
}

export default class ResponseBox extends Component {


  render(){
    return (
      <div
        className="foreign-object"
        style={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'space-between',
          height:'100%',
          width:'100%',
          textAlign:'initial',
          margin:'5em, 0, 5em, 0',
          color: textColourGenerator(this.props.group)
        }}>

          <blockquote className="response-text" style={{
            marginTop:window.innerWidth < 880 ? 0 : '1rem',
            marginLeft:window.innerWidth < 880 ? 0 : '1rem'
          }}>
            <p>{this.props.text}</p>
          </blockquote>

          <div style={{
            width:'90%',
            height:'2rem',
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between',
            marginLeft:window.innerWidth < 880 ? '0.5rem' : '1.5rem',
            marginBottom:window.innerWidth < 880 ? '0.25rem' : '1rem'}}>
              <div className="divider-bar"
                style={{
                height:'0.125em',
                backgroundColor: textColourGenerator(this.props.group)
              }}></div>
              <div className="profession"
                style={{
                fontWeight:'500',
                fontSize:'18px'}}>{nameGenerator(this.props.group).toUpperCase()}
              </div>
          </div>



      </div>
    )
  }
}

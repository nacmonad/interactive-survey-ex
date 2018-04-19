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
    console.log(this.props)
    return (
      <div
        className="response-box"
        style={{
          position:'absolute',
          display:'flex',
          flexDirection:'column',
          justifyContent:'space-between',
          alignItems:'flex-start',
          height: this.props.height,
          width:this.props.width,
          top: window.innerWidth < 880 && this.props.showForm ? this.props.y+96+96+document.getElementById('form-wrapper').getBoundingClientRect().height :this.props.y+96+96 ,
          left: this.props.x + 20,
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
            alignItems:'flex-start',
            marginLeft:window.innerWidth < 880 ? '0.5rem' : '1.5rem',
            marginBottom:window.innerWidth < 880 ? '0.25rem' : '1rem'}}>
              <div className="divider-bar"
                style={{
                width:'100%',
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

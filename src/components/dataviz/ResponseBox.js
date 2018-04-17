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

          <blockquote className="response-text" style={styles.responseText}>
            <p>{this.props.text}</p>
          </blockquote>

          <div style={{zIndex:2,position:'relative', width:'90%', marginLeft:'auto', marginRight:'auto', marginBottom:'1em'}}>
            <div className="divider"
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

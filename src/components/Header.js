import React from 'react';
import Typography from 'material-ui/Typography';
import {colourGenerator} from '../js/colourGenerator';

import logo from '../img/st-joes-logo.png'

const styles = {
  header:{
    display:'flex',
    height:'96px',
    width:'100%',
    background: 'white'
  }

}

export default function Header (props){
  return (
    <div className="header" style={styles.header}>
        <img src={logo} alt={"logo"} style={{height:'96px'}}/>
    </div>
  )
}

import React from 'react';
import Typography from 'material-ui/Typography';
import {colourGenerator} from '../js/colourGenerator';

const styles = {
  divider:{
    height:'32px',
    width:'100%',
    background: colourGenerator(1),
  },
}

export default function Divider (props){
  return (
    <div className="divider" style={styles.divider}>
    </div>
  )
}

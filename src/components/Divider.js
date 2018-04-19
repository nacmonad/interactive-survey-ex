import React from 'react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import {colourGenerator} from '../js/colourGenerator';

const styles = {
  divider:{
    height:'32px',
    width:'100%',
    background: colourGenerator(1),
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-end'
  },
}

export default function Divider (props){
  return (
    <div className="divider" style={styles.divider}>
      {!props.showForm && <Button size="small" color="primary" style={{marginRight:'1rem'}} onClick={props.showLegend}>Show Legend</Button>}
    </div>
  )
}

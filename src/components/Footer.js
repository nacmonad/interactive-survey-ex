import React from 'react';
import Typography from 'material-ui/Typography';
import {colourGenerator} from '../js/colourGenerator';

const styles = {
  footer:{
    width:'100%',
    background: colourGenerator(1),
  },
  wrapper:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    marginLeft:'1rem',
    marginRight:'1rem'
  }

}

export default function Footer (props){
  return (
    <div className="footer" style={styles.footer}>
    <div style={styles.wrapper}>
      <Typography variant="display1" style={{color:'rgba(255,255,255,0.8)'}} gutterBottom>
          Have questions?
        </Typography>
        <Typography variant="subheading" style={{color:'rgba(255,255,255,0.8)'}} gutterBottom>
            Email <a href="mailto:stratplan@stjoes.ca">stratplan@stjoes.ca</a>
          </Typography>
      </div>
    </div>
  )
}
